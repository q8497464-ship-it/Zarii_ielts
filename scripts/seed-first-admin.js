#!/usr/bin/env node
/**
 * Zarii IELTS - First Admin Provisioning Script
 *
 * Usage:
 *   ADMIN_EMAIL="admin@zarii.app" ADMIN_PASSWORD="YourPassword123!" node scripts/seed-first-admin.js
 *
 * Environment variables:
 *   - ADMIN_EMAIL (required): Email address of the first administrator
 *   - ADMIN_PASSWORD (optional): Initial password (defaults to 'AdminSecure2026!')
 *   - VITE_SUPABASE_URL or SUPABASE_URL: Supabase Project URL
 *   - SUPABASE_SERVICE_ROLE_KEY: Supabase secret service role key (found in Project Settings -> API)
 */

import fs from 'fs';
import path from 'path';

// Attempt to load .env or .env.local if present
function loadEnv() {
  const envPaths = ['.env.local', '.env'];
  for (const p of envPaths) {
    const fullPath = path.resolve(process.cwd(), p);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  }
}

loadEnv();

const adminEmail = (process.env.ADMIN_EMAIL || process.argv[2] || '').trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecure2026!';
const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('====================================================');
console.log('   Zarii IELTS: Initial Admin Provisioning Tool   ');
console.log('====================================================\n');

if (!adminEmail) {
  console.error('❌ Error: ADMIN_EMAIL environment variable is required.');
  console.log('\nExample:');
  console.log('  ADMIN_EMAIL="admin@zarii.app" ADMIN_PASSWORD="YourPassword123!" node scripts/seed-first-admin.js\n');
  process.exit(1);
}

console.log(`Target Admin Email: ${adminEmail}`);

async function provisionAdmin() {
  // Scenario 1: Live Supabase with Service Role Key
  if (supabaseUrl && serviceRoleKey) {
    console.log(`Connecting to Supabase at: ${supabaseUrl}`);

    try {
      // 1. Create or invite user via Supabase Auth Admin REST API
      const createRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
          user_metadata: { full_name: 'Zarii Administrator', role: 'admin' },
        }),
      });

      let userId = null;
      const createJson = await createRes.json();

      if (createRes.ok && createJson.id) {
        userId = createJson.id;
        console.log(`✓ Auth user created successfully with ID: ${userId}`);
      } else if (createJson.msg && createJson.msg.includes('already registered')) {
        console.log('ℹ User already exists in auth.users. Fetching user ID...');
        // Find existing user
        const listRes = await fetch(`${supabaseUrl}/auth/v1/admin/users?page=1&per_page=100`, {
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
          },
        });
        const listJson = await listRes.json();
        const existing = listJson.users?.find((u) => u.email.toLowerCase() === adminEmail);
        if (existing) {
          userId = existing.id;
          console.log(`✓ Found existing user ID: ${userId}`);
        }
      } else {
        console.warn(`⚠ Notice from Auth API: ${createJson.message || createJson.msg || JSON.stringify(createJson)}`);
      }

      // 2. Set profile role to 'admin' in public.profiles table
      if (userId) {
        const updateRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            Prefer: 'return=representation',
          },
          body: JSON.stringify({
            role: 'admin',
            status: 'active',
            name: 'Zarii Administrator',
            updated_at: new Date().toISOString(),
          }),
        });

        if (updateRes.ok) {
          console.log(`✓ Profile for ${adminEmail} updated to role = 'admin'.`);
        } else {
          // If profile row doesn't exist yet, insert it
          await fetch(`${supabaseUrl}/rest/v1/profiles`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
              Prefer: 'resolution=merge-duplicates',
            },
            body: JSON.stringify({
              id: userId,
              role: 'admin',
              status: 'active',
              name: 'Zarii Administrator',
            }),
          });
          console.log(`✓ Profile inserted with role = 'admin'.`);
        }
      }

      console.log('\n🎉 First Admin successfully provisioned!');
      console.log(`   Email:    ${adminEmail}`);
      console.log(`   Role:     admin`);
      console.log(`   Console:  /admin/login`);
      return;
    } catch (err) {
      console.error('⚠ Remote connection failed:', err.message);
      console.log('Falling back to SQL generator...\n');
    }
  }

  // Scenario 2: Offline / SQL Generator Fallback
  console.log('\nℹ Direct service role connection not configured or offline.');
  console.log('Here is the SQL snippet to execute in your Supabase SQL Editor:\n');
  console.log('----------------------------------------------------');
  console.log(`-- Run this in Supabase Dashboard -> SQL Editor:

-- Step 1: Promote user profile to admin
UPDATE public.profiles
SET role = 'admin', status = 'active'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = '${adminEmail}'
);

-- If the user was just created and not in profiles yet:
INSERT INTO public.profiles (id, name, role, status)
SELECT id, 'Zarii Administrator', 'admin', 'active'
FROM auth.users
WHERE email = '${adminEmail}'
ON CONFLICT (id) DO UPDATE
SET role = 'admin', status = 'active';

-- Verify the promotion:
SELECT id, name, role, status FROM public.profiles WHERE role = 'admin';
`);
  console.log('----------------------------------------------------');
  console.log(`\n✓ Instructions generated for admin: ${adminEmail}`);
}

provisionAdmin().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
