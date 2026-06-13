# AccessFlow Roadmap

## Current phase

AccessFlow is in prototype/product-discovery phase.

## Next recommended phase: architecture

1. Normalize Supabase data model.
2. Implement real role-based permissions.
3. Add audit trails.
4. Add conflict-safe sync.
5. Add remote image storage.
6. Add team/workspace model.
7. Add formal report templates.
8. Add test suite.
9. Run mobile accessibility QA.
10. Conduct user testing with staff and supported users using mock data.

## Product priorities

1. Student autonomy.
2. Low cognitive load.
3. Staff setup clarity.
4. Data safety.
5. Documentation usefulness.
6. Real-world mobile reliability.


## v23 backend readiness

v23 adds data-health analysis and normalized-export tooling.

Next architecture release should:

1. Add workspace/team tables.
2. Make normalized tables active behind a repository layer.
3. Migrate existing snapshot payloads into normalized rows.
4. Add audit logs.
5. Add remote storage for uploaded images.
6. Add integration tests for migration and sync.


## v24 GUI stabilization note

v24 adds a cleaner Student Mode panel layout system. Next recommended work is still backend architecture,
but any future feature should first define where it appears in the Student panel layout model.


## v25 preset note

Future student-facing features should be added to the preset model before being shown by default.
This keeps Student Mode intentional instead of feature-heavy.


## v26 documentation and compliance-readiness note

v26 documents the current codebase and formalizes the HIPAA/FERPA readiness gap.
Next recommended work is architectural refactoring and active normalized backend migration.


## v27 refactor note

v27 moves pure helper logic out of `App.jsx`. The next refactor should extract React domain hooks,
beginning with schedule actions and cloud sync.


## v28 hook refactor note

v28 extracts React side effects from `App.jsx`. The next refactor should move action handlers into domain hooks, starting with schedule actions and cloud snapshot actions.


## v29 action hook refactor note

v29 extracts action-heavy handler groups from `App.jsx`. The next refactor should split profile/schedule state derivation and cloud snapshot actions further, then move toward the active normalized backend.


## v30 final refactor note

v30 completes the current refactor/cleanup phase. The next product phase can return to accessibility feature planning. The next engineering phase should be automated tests and normalized backend migration.


## v31 communication support note

v31 resumes disability-support feature development after the v30 cleanup phase.
Future communication supports should remain profile-configurable and hidden behind display settings/presets.


## v32 self-advocacy support note

v32 adds student-facing self-advocacy tools. Future work should connect these events to communication-history summaries and weekly reports.


## v33 communication history and guided builder note

v33 adds staff communication-history review, a student guided schedule builder, and mobile quick navigation.
Future work should add exportable communication summaries and eventually connect pattern review to goal/support-plan recommendations.


## v39 leap forward note

v39 adds goal-aware support planning, community access/safety cards,
vocational task mode, caregiver/family handoff generation, and a normalized
backend readiness start. Snapshot sync remains active. Future work should
focus on build/browser QA, then a controlled normalized backend migration.


## v40 release-candidate note

v40 stabilizes the v31-v39 feature expansion with feature presets and a staff feature map.
The next phase should be build/browser QA and then controlled backend migration planning.


## v41 self-advocacy passport note

v41 adds a student self-advocacy passport and staff support pattern log.
Next work should focus on live build/browser QA and targeted fixes from testing.


## v42 activity readiness note

v42 adds student activity prep, reflection, and try-again-later requests.
Next work should be live browser testing or targeted mobile cleanup based on screenshots.


## v43 alternative access note

v43 adds calm mode, communication repair, switch scanning prototype, and eye-gaze/reduced-choice presets.
Future work should focus on live testing, real switch/keyboard access, row/column scanning, and deeper AAC vocabulary.


## v44 AAC expansion note

v44 adds core words, quick phrases, feelings/intensity, social scripts, and staff editing for AAC expansion.
Future AAC work could add vocabulary categories, message strip integration, bilingual labels, and true AAC export/import.


## v45 icon library note

v45 adds Font Awesome Free icon support, a curated icon picker, and visual-symbol flexibility.
Future work could add per-button visual editing across every communication board, uploaded-photo selection inside AAC buttons, and bilingual label support.


## v46 universal symbol labels note

v46 expands Font Awesome visual support across more student communication panels and lets staff edit existing AAC visuals.
Future work could add per-button visual editing for sensory, life-skills, community, vocational, and self-advocacy settings.


## v47 communication visual customization note

v47 expands Font Awesome icon/emoji editing to more communication and life-skills tools.
Future work could add global visual presets, per-student symbol style defaults, and uploaded-photo selection inside each communication button editor.


## v48 visual library assignment note

v48 lets staff assign saved Visual Library visuals to AAC and communication buttons.
Future work could add global visual-style presets, uploaded-photo capture directly inside button editors, and bulk replace visual style across a whole profile.


## v49 visual coverage audit note

v49 adds a staff visual coverage audit and suggested-icon application.
Future work could add bulk visual-style presets, visual contrast checks, uploaded-photo coverage checks, and per-profile symbol-system recommendations.


## v50 solid release candidate note

v50 stabilizes the visual-symbol architecture and adds student visual preference modes plus a staff release-readiness dashboard.
Future v51+ work should prioritize live browser testing, uploaded-photo workflows, backend schema alignment, and deeper production-readiness planning.
