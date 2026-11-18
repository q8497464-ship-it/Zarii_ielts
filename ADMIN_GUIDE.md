# Zarii IELTS - Administrator & Editor Guide

Welcome to the Zarii IELTS Admin Panel. This guide outlines how to manage content, users, AI evaluators, and system maintenance.

---

## 1. Accessing the Admin Panel

1. Navigate to `/admin/login`.
2. Sign in with an account having the `admin` or `editor` role.
3. Editors have access to **Content** and **Communication**. Admins have access to all areas including **Users**, **Analytics**, **AI and Evaluation**, **Site Settings**, and **System**.

---

## 2. Content Management (`/admin/content`)

### Creating & Editing Tests
1. Navigate to **Content > Tests** and click **New Test**.
2. Select the module:
   - **Reading**: Add 3 passages (Academic) or 3 sections (General). Enter passage title, reading text, and question groups.
   - **Listening**: Provide the audio URL or synthesized speech script, section durations, and group instructions.
   - **Writing**: Specify Task 1 (Academic/General) or Task 2. For Task 1 Academic, upload chart images or input data tables for visual rendering.
   - **Speaking**: Configure cue cards, Part 1 warm-up prompts, Part 2 cue bullet points, and Part 3 discussion questions.
3. Supported Question Types:
   - Multiple Choice (Single & Multiple selection)
   - True / False / Not Given & Yes / No / Not Given
   - Matching Headings & Matching Information
   - Sentence / Summary / Flow-chart Completion
   - Short Answer & Map / Diagram Labelling
4. **Validation Panel**:
   - The editor will display red alerts and disable the **Publish** button if:
     - Question numbers are non-sequential or duplicated.
     - Any question lacks an answer key.
     - Passage word counts fall below IELTS thresholds.
     - Completion questions have empty accepted answers.

### Managing Vocabulary & Grammar
- Go to **Content > Vocabulary** to add words with CEFR/IELTS band estimates, definitions, phonetics, Urdu hints, and example sentences.
- Go to **Content > Grammar** to create step-by-step grammar lessons with interactive practice exercises.

---

## 3. AI Evaluator & Prompt Tuning (`/admin/ai`)

### Configuring Free-Tier AI Providers
1. Go to **AI and Evaluation > Providers**.
2. Supported Providers:
   - **Google Gemini API** (Gemini 1.5 Flash - Free Tier)
   - **Groq Cloud** (Llama 3.3 70B / 8B - Free Tier)
3. Enter the API Key (stored encrypted server-side; masked in the UI).
4. Click **Test Connection** to verify latency and authentication.
5. Set the daily request limit. When the limit is reached, the student app gracefully falls back to the deterministic rule-based evaluator.

### Prompt Calibration & Management
1. Go to **AI and Evaluation > Prompt Manager**.
2. Adjust system prompts for Writing Task 1, Task 2, and Speaking evaluation.
3. Use the built-in **Run Test Essay** feature to benchmark the prompt against standard Cambridge-calibrated essays before saving a new prompt version.

---

## 4. Communication (`/admin/communication`)

### Student Announcements
1. Navigate to **Communication > Announcements**.
2. Click **Create Announcement**.
3. Choose the style: **Banner** (top of app) or **Modal** (onboarding/update dialog).
4. Set targeting: *All Students*, *New Signups*, or *Active Learners*.
5. Set Start and End dates. Students who dismiss an announcement will not see it again.

### Feedback Inbox
1. Go to **Communication > Feedback Inbox**.
2. Review reports submitted by students across categories: *Bug*, *Content Error*, *Feature Request*, or *Praise*.
3. If feedback is linked to a specific test or question, click **Open in Editor** to jump directly to the question builder and update the answer key.
4. Update status to *In Review* or *Resolved*, and add internal notes.

---

## 5. System Administration (`/admin/system`)

### Backups & Data Export
1. Go to **System > Backups**.
2. Click **Create Full Export** to download a complete, encrypted JSON archive containing all tests, vocabulary, grammar lessons, settings, and announcements.
3. To restore, upload an export archive and run the **Dry Run Validation** before applying changes.

### Content Health Check
- Click **Run Content Health Check** to audit every published test for missing audio links, orphaned questions, broken image assets, or ambiguous answer keys.

### Audit Log
- All administrative actions (user role changes, test publications, prompt updates, deletions) are recorded in an append-only audit log exportable as CSV.

---

## 6. Administrative Authentication & MFA Architecture

### Authentication Screens Overview
All administrative auth screens reside in the isolated `/admin` bundle and use a dedicated 100dvh centered layout with the `#0E3D32` to `#124F40` gradient and subtle open-book line geometry:

1. **Admin Sign In (`/admin/login`)**:
   - Clean, centered card with email, password (show/hide toggle), and primary "Sign in" action.
   - Strictly generic error handling: returns `"Invalid credentials or no access"` for wrong password, unknown email, or student accounts.
   - Brute-force protection: locks browser after 5 failed attempts for 15 minutes with a live countdown timer.
   - Logs failed sign-in attempts to the append-only `audit_log` (with timestamp and coarse client user agent, zero passwords).
   - If two-factor authentication is required, smoothly transitions to MFA verification or first-time enrollment.

2. **MFA Enrollment (`/admin/setup-2fa`)**:
   - Mandatory for administrators upon first login.
   - Displays a vector SVG QR code and manual base32 secret key (with one-click copy).
   - Requires entering a 6-digit verification code to confirm setup.
   - Generates 8 single-use emergency backup recovery codes (format: `XXXX-XXXX`).
   - Requires confirming receipt before continuing; provides "Download (.txt)" and "Copy codes" utilities.

3. **MFA Challenge (`/admin/verify-2fa`)**:
   - 6 auto-advancing input boxes with full paste support and auto-submission on the 6th digit.
   - Emergency fallback: "Use a recovery code instead" allows single-use consumption of a backup code.

4. **Forgot Password (`/admin/forgot-password`)**:
   - Admin email entry with neutral success message: *"If an administrative account is associated with this email, you will receive password reset instructions shortly."* (Prevents user enumeration).

5. **Reset Password (`/admin/reset-password`)**:
   - Real-time password strength meter enforcing the administrator standard: minimum 12 characters with uppercase, lowercase, numbers, and symbols.

6. **Accept Invitation (`/admin/accept-invite`)**:
   - Tokenized activation link displaying the invited email in a verified, read-only field.
   - Prompts for full name and a 12+ character password before guiding into mandatory 2FA enrollment.

7. **Access Denied (`/admin/forbidden`)**:
   - Displayed when non-administrative accounts attempt to access `/admin`.
   - Offers "Go to Student Workspace" or "Sign out and switch account".

8. **Session Expired Lock Screen**:
   - Triggered after 30 minutes of inactivity.
   - An in-situ unlock modal allowing the administrator to re-enter their password and unlock their session immediately without losing unsaved changes.
   - Features a 25-minute preemptive warning modal: *"You will be signed out in 5 minutes due to inactivity. Stay signed in?"*.

---

## 7. Supabase Dashboard Configuration

### 1. Enabling Multi-Factor Authentication (TOTP)
1. Open your **Supabase Dashboard** -> Select the Zarii IELTS project.
2. In the left navigation, navigate to **Authentication** > **Multi-Factor**.
3. Under **TOTP (Time-based One-Time Password)**:
   - Toggle **Enable TOTP** to `ON`.
   - Set **Issuer** to: `Zarii Admin`.
   - Set **Max Enrolled Factors per User** to: `2` (or default).
4. Under **Rate Limits**:
   - Keep standard Supabase Auth rate limits (default: 30 requests/min).

### 2. Configuring Invitation Email Templates
1. Navigate to **Authentication** > **Email Templates** > **Invite user**.
2. Set **Subject**: `You've been invited to the Zarii Administrator Team`.
3. Set **Body**:
```html
<h2>Welcome to the Zarii IELTS Administrator Team</h2>
<p>You have been invited to join the management portal as an administrator or content editor.</p>
<p>
  <a href="{{ .SiteURL }}/admin/accept-invite?token={{ .TokenHash }}&email={{ .Email }}">
    Accept Invitation and Activate Account
  </a>
</p>
<p>This invitation link expires in 48 hours. If you were not expecting this invite, please disregard this email.</p>
```
4. In **Authentication** > **URL Configuration**, add `https://zarii.app/admin/*` to **Redirect URLs**.

---

## 8. Emergency Lost Admin Recovery Procedure (CLI & SQL)

If the primary administrator loses their password, loses access to their 2FA authenticator app, or the last admin account becomes inaccessible:

### Method A: Direct SQL Recovery (Supabase SQL Editor)
Run the following SQL snippet in the Supabase Dashboard SQL Editor (or via `psql` connected with the database connection pooler):

```sql
-- 1. Create or ensure the administrator profile exists with active status
INSERT INTO public.profiles (id, name, role, status, target_band, created_at, updated_at)
VALUES (
  'usr_admin_emergency',
  'Emergency Administrator',
  'admin',
  'active',
  9.0,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  status = 'active',
  updated_at = NOW();

-- 2. If promoting an existing user email to administrator:
UPDATE public.profiles
SET role = 'admin', status = 'active', updated_at = NOW()
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'target_admin@domain.com'
);

-- 3. Reset 2FA factors for an account if the authenticator device is lost:
DELETE FROM auth.mfa_factors
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'target_admin@domain.com'
);

-- 4. Verify administrator accounts count:
SELECT p.id, u.email, p.name, p.role, p.status, p.created_at
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.role = 'admin';
```

### Method B: Supabase CLI Emergency Reset
Using the Supabase CLI in your terminal:

```bash
# 1. Update the administrator user password directly via Supabase Auth Admin CLI:
supabase auth users update <USER_UUID> --password "NewEmergencyPassword123!"

# 2. Or create a fresh admin user via CLI:
supabase auth users create emergency-admin@zarii.app \
  --password "EmergencyAdminPassword123!" \
  --metadata '{"full_name": "Emergency Admin", "role": "admin"}'
```

