# AccessFlow Compliance Gap Analysis

## Summary

AccessFlow has strong prototype functionality, but several critical compliance gaps remain.

## Gap table

| Area | Current state | Needed for production |
|---|---|---|
| Authentication | Supabase auth optional; staff PIN local prototype | Required auth, MFA option, account lifecycle |
| Authorization | UI-level roles/presets | Server-enforced RBAC/ABAC |
| Data model | Snapshot sync | Normalized tables with RLS |
| Audit logs | Not production-grade | Immutable audit events |
| PHI/PII controls | Prototype warnings only | Data classification, minimization, disclosure workflow |
| FERPA access/amendment | Not implemented | Parent/eligible student access/amendment process support |
| HIPAA business associate readiness | Not implemented | BAA, policies, risk analysis, safeguards |
| Image storage | Images may be embedded in snapshots | Secure storage bucket, access policies, deletion controls |
| Data retention | Not implemented | Configurable retention/deletion policy |
| Incident response | Not implemented | Written incident response and breach process |
| Testing | Manual QA docs | Automated tests, security tests, accessibility tests |
| Accessibility validation | Design-oriented only | WCAG/AT/user testing |

## Highest-risk current issue

Snapshot sync stores a full workspace payload. This is simple for prototyping, but it is not appropriate as a final compliance architecture because it limits auditability, row-level access control, selective deletion, and least-privilege queries.

## Recommended next architecture sprint

1. Add workspaces and workspace memberships.
2. Add normalized tables as the active data layer.
3. Add audit log table.
4. Add server-enforced roles.
5. Add storage bucket policies for visuals/photos.
6. Add data retention controls.
