# AccessFlow Known Limitations

## Compliance

AccessFlow is not production-compliant for HIPAA, FERPA, agency records, or clinical documentation. Use mock data only.

## Data model

The active cloud sync model is still snapshot-based. The normalized Supabase schema in `database/v20-normalized-schema.sql` is a scaffold, not the active data layer.

## Authentication and roles

Staff PIN is local prototype protection. Role permissions are planning-level only and are not enforced across a production backend.

## Offline/PWA

PWA support is app-shell scaffolding. It is not a full offline-first sync system.

## Reports

Reports are generated from prototype data structures and should not be treated as official records.

## Goal tracking

Goal matching is currently text-based by activity name. A production version should link goals to stable goal/activity IDs.

## Visual library

Visuals are stored in the snapshot. Uploaded images may increase local/cloud payload size.

## Accessibility

AccessFlow includes many accessibility-oriented features, but it has not gone through formal user testing, WCAG audit, assistive technology testing, or clinical validation.


## v23 data-health note

Data-health warnings are prototype diagnostics only. They do not verify compliance,
privacy readiness, data retention, auditability, or production security.
