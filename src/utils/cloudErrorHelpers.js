/**
 * Supabase/cloud error formatting helpers.
 *
 * Converts low-level Supabase/network errors into staff-readable guidance.
 */
export function formatCloudError(action, error) {
  const message = error?.message || "Unknown Supabase error.";
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("permission denied")) {
    return `${action} failed: permission denied. Check Supabase grants and RLS policies for accessflow_workspace_snapshots.`;
  }

  if (lowerMessage.includes("row-level security") || lowerMessage.includes("violates row-level security")) {
    return `${action} failed: RLS blocked the request. Confirm the user_id column and auth.uid() policies are installed.`;
  }

  if (lowerMessage.includes("jwt") || lowerMessage.includes("invalid token")) {
    return `${action} failed: the sign-in session looks expired. Sign out, sign back in, and try again.`;
  }

  if (lowerMessage.includes("failed to fetch") || lowerMessage.includes("network")) {
    return `${action} failed: network or Supabase connection problem. Check the Render env vars and Supabase project status.`;
  }

  return `${action} failed: ${message}`;
}
