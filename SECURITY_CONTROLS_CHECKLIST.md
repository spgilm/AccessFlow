# AccessFlow Security Controls Checklist

## Identity and access

- [ ] Require authenticated users for staff access.
- [ ] Add MFA option.
- [ ] Enforce roles server-side.
- [ ] Add workspace/team membership table.
- [ ] Add account deactivation.
- [ ] Add least-privilege permissions.

## Auditability

- [ ] Log create/update/delete events.
- [ ] Log exports.
- [ ] Log sign-in/sign-out events.
- [ ] Log failed access attempts.
- [ ] Make audit logs append-only.
- [ ] Review audit logs from admin UI.

## Data protection

- [ ] Use HTTPS only.
- [ ] Encrypt data at rest through managed database/storage.
- [ ] Move uploaded images to protected storage.
- [ ] Add object-level storage policies.
- [ ] Add deletion workflow.
- [ ] Add retention workflow.
- [ ] Add backup and recovery policy.

## Privacy

- [ ] Minimize required personal data.
- [ ] Add consent/disclosure metadata where applicable.
- [ ] Add parent/eligible-student access workflow where FERPA applies.
- [ ] Add amendment/correction workflow where FERPA applies.
- [ ] Add organization-level privacy notice.
- [ ] Add data-processing agreement review.

## Application security

- [ ] Add automated tests.
- [ ] Add dependency scanning.
- [ ] Add security headers.
- [ ] Add input validation.
- [ ] Add rate limiting for auth-sensitive operations.
- [ ] Add error handling that does not expose sensitive data.

## Accessibility

- [ ] Run keyboard-only testing.
- [ ] Run screen-reader testing.
- [ ] Run mobile touch-target testing.
- [ ] Test reduced-motion setting.
- [ ] Test high-contrast/dark mode.
- [ ] Conduct user testing with mock data.
