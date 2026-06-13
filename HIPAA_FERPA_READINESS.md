# AccessFlow HIPAA / FERPA Readiness

## Current status

AccessFlow is not currently HIPAA-compliant, FERPA-compliant, or production-ready for real student/client data.

v26 adds documentation and readiness scaffolding. It does not complete legal, operational, or security compliance.

## HIPAA relevance

HIPAA may become relevant if AccessFlow stores, receives, transmits, or processes protected health information for a covered entity or business associate.

HIPAA readiness requires technical, administrative, and physical safeguards, plus correct contracts and organizational processes.

## FERPA relevance

FERPA may become relevant if AccessFlow stores or processes education records or personally identifiable information from education records for a school, district, agency, or party acting on their behalf.

## Non-negotiable production requirements

```txt
Real authentication
Role-based authorization enforced server-side
Row-level security
Audit logging
Encryption in transit
Encryption at rest
Data minimization
Data retention and deletion policy
Access review process
Incident response process
Backup and disaster recovery process
Vendor/BAA/DPA review
Parent/eligible student access/amendment workflow where applicable
Consent/disclosure controls where applicable
```

## Product changes needed before real data

1. Replace snapshot sync with normalized database tables.
2. Add server-enforced workspace/team membership.
3. Add audit logs for create/read/update/delete/export/login events.
4. Add user roles with least-privilege enforcement.
5. Add record retention and deletion controls.
6. Add admin export/access logs.
7. Add secure remote image storage.
8. Add configurable consent/disclosure metadata.
9. Add organization-level data processing configuration.
10. Complete external legal/security review.

## Do not do yet

```txt
Do not use real student/client names.
Do not upload real faces or identifying images.
Do not store health details.
Do not store IEP/ISP official records.
Do not use exports as official documentation.
```
