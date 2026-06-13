# AccessFlow v50 Cleanup and Refactor Notes

## What was cleaned up

- Visual preference logic moved into `src/utils/visualPreferences.js`.
- Release readiness calculations moved into `src/utils/releaseReadiness.js`.
- Staff release-review UI isolated in `StaffReleaseReadinessPanel.jsx`.
- Student Mode visual-emphasis behavior handled through CSS classes instead of duplicating button logic.
- Existing Font Awesome, Visual Library, and label-preservation architecture was kept intact.

## Refactor rule followed

v50 avoids changing the meaning of communication buttons. Labels remain the source of truth.

## Manual test priority

1. Student Mode on mobile width.
2. Visual preference modes.
3. Visual Library assigned images.
4. AAC and self-advocacy labels.
5. HIPAA/FERPA prototype warning footer.
6. Staff release readiness panel.
