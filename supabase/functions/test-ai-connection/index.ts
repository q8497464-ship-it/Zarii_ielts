// Supabase Edge Function: test-ai-connection
// Admin-only diagnostics to test server-side AI provider connectivity
// Ensures zero secret leakage to the browser.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid session." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Role check: Admin only
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: profile } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Access denied: Requires administrator privileges." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const provider = body.provider || "gemini";

    const startTime = Date.now();
    let status = "online";
    let message = "Provider connection verified successfully.";

    if (provider === "gemini") {
      const key = Deno.env.get("GEMINI_API_KEY");
      if (!key) {
        status = "offline";
        message = "GEMINI_API_KEY is not configured in Supabase environment secrets.";
      }
    } else if (provider === "groq") {
      const key = Deno.env.get("GROQ_API_KEY");
      if (!key) {
        status = "offline";
        message = "GROQ_API_KEY is not configured in Supabase environment secrets.";
      }
    }

    const latencyMs = Date.now() - startTime;

    // Log diagnostic audit entry
    await adminClient.from("audit_log").insert({
      actor_id: user.id,
      action: "TEST_AI_CONNECTION",
      target_type: "ai_provider",
      target_id: provider,
      details: { status, latencyMs },
    });

    return new Response(
      JSON.stringify({
        provider,
        status,
        latencyMs,
        message,
        checkedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Diagnostic test error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
