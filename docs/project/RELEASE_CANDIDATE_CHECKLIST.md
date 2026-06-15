# AccessFlow v40 Release Candidate Checklist

## Status

v40 is a release-candidate stabilization package, not a production compliance release.

## Build / deploy

- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Run `npm run dev`
- [ ] Deploy to Render test environment
- [ ] Confirm no package-lock/internal registry issue
- [ ] Confirm Supabase env vars are correct if testing cloud sync

## Student Mode smoke test

- [ ] Today tab loads
- [ ] Schedule cards render
- [ ] Steps expand/collapse
- [ ] Communication tools open
- [ ] Self-advocacy tools open
- [ ] Life skills tools open
- [ ] Choose tab loads
- [ ] Guided schedule builder adds selected activities
- [ ] Board tab loads
- [ ] Mobile quick nav switches tabs

## Staff Mode smoke test

- [ ] Dashboard loads
- [ ] Feature map opens correct tabs
- [ ] Feature presets apply
- [ ] Profile display settings still work manually
- [ ] Choices tab loads
- [ ] Schedule tab loads
- [ ] Notes tab loads
- [ ] Save tab loads
- [ ] Backend normalization panel is visible
- [ ] Prototype/privacy warnings are visible

## Mobile / tablet

- [ ] Phone portrait
- [ ] Phone landscape
- [ ] Tablet portrait
- [ ] Tablet landscape
- [ ] Touch targets usable
- [ ] No horizontal scrolling
- [ ] Sticky student quick nav does not cover critical buttons

## Accessibility

- [ ] Keyboard navigation
- [ ] Focus indicators visible
- [ ] Read-aloud on/off
- [ ] Dark mode contrast
- [ ] Large touch mode
- [ ] Icons-only mode
- [ ] Words-only mode

## Data safety

- [ ] No real PHI/PII/education records entered
- [ ] Backup export works
- [ ] Backup import works
- [ ] Cloud snapshot save/load works with test data only
- [ ] Staff understands snapshot sync remains active
- [ ] Normalized backend is planning scaffold only
