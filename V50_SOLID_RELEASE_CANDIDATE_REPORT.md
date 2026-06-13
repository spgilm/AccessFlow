# AccessFlow v50 Solid Release Candidate Report

## Purpose

v50 is a cleanup-and-stabilization release candidate. It adds two new features while consolidating the accessibility direction of the prototype.

## New feature 1: Student visual preference modes

Staff can configure the student's visual emphasis:

```txt
Balanced visuals + labels
Large visuals
Label-first
Labels only
```

This changes visual emphasis but does not remove communication labels as the semantic source.

## New feature 2: Staff release readiness dashboard

Staff Mode now includes a v50 release readiness panel that summarizes:

```txt
Prototype warning status
Label-primary communication status
Visual coverage status
Visual Library status
Student visual preference status
Support-event logging status
Profile setup status
```

## Cleanup/refactor

```txt
src/utils/visualPreferences.js
src/utils/releaseReadiness.js
src/components/StaffReleaseReadinessPanel.jsx
```

These isolate v50 display behavior and release-readiness logic from the large Staff/Student screens.

## Safety note

AccessFlow is still a prototype. It is not HIPAA certified, not FERPA certified, and should not be used with real student/client data.
