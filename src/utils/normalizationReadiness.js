/**
 * Normalization readiness helpers.
 *
 * v39 starts the planning bridge from snapshot sync toward normalized tables.
 */
export const normalizedDomainTables = [
  {
    domain: "Profiles",
    tables: ["profiles", "profile_settings", "profile_visuals"],
    status: "planned",
  },
  {
    domain: "Schedules",
    tables: ["schedules", "activities", "activity_steps"],
    status: "planned",
  },
  {
    domain: "Communication",
    tables: ["support_events", "communication_events", "choice_board_items"],
    status: "planned",
  },
  {
    domain: "Goals",
    tables: ["progress_goals", "goal_observations", "prompt_records"],
    status: "planned",
  },
  {
    domain: "Life skills",
    tables: ["community_supports", "vocational_events", "handoff_reports"],
    status: "planned",
  },
  {
    domain: "Audit",
    tables: ["audit_log", "export_log", "access_reviews"],
    status: "needed before production",
  },
];

export function buildNormalizationReadinessSnapshot({ dataHealth } = {}) {
  const warnings = dataHealth?.warnings ?? [];

  return {
    currentStorage: "Supabase snapshot sync / localStorage prototype",
    targetStorage: "Normalized Supabase tables with RLS and audit logging",
    readinessStatus: "planning scaffold",
    blockers: [
      "Server-enforced roles are not active.",
      "Audit log tables are not active.",
      "Snapshot payload remains the active sync model.",
      "Production retention/deletion workflow is not active.",
    ],
    dataWarnings: warnings,
    domains: normalizedDomainTables,
  };
}
