# AccessFlow QA Checklist

Use this checklist before adding more features.

## Student Mode

- [ ] Student Mode loads without console errors.
- [ ] Today tab shows the correct profile.
- [ ] Simple mode hides advanced controls.
- [ ] Standard mode shows a manageable workflow.
- [ ] Advanced mode shows full controls.
- [ ] Board-only mode opens directly to Board.
- [ ] First/Then-only mode opens directly to First/Then.
- [ ] Check-in can be hidden/shown by profile.
- [ ] Reward board can be hidden/shown by profile.
- [ ] Support buttons can be hidden/shown by profile.
- [ ] Break plan can be hidden/shown by profile.
- [ ] Transition supports can be hidden/shown by profile.
- [ ] Schedule date can be hidden/shown by profile.
- [ ] Board activity section can be hidden/shown by profile.
- [ ] Text display modes work: icons + words, icons only, words only.
- [ ] Touch size modes work: standard, large, extra large.
- [ ] Read-aloud does not speak decorative emoji.

## Staff Mode

- [ ] Dashboard opens.
- [ ] Profile settings save.
- [ ] Student visibility toggles work.
- [ ] Student Choices bank works.
- [ ] Communication Board manager works.
- [ ] Visual library works.
- [ ] Schedule editor works.
- [ ] Goals can be added and reported.
- [ ] Session notes can be saved.
- [ ] Handoff report downloads.
- [ ] Export buttons download files.
- [ ] Cloud save/load still works.
- [ ] Import/export backup still works.

## Data Safety

- [ ] Prototype warning is visible in Save tab.
- [ ] README warns against real student/client data.
- [ ] Exports do not claim compliance.
- [ ] Supabase snapshot sync still warns about prototype status.

## Mobile

- [ ] Student tabs align correctly.
- [ ] Staff tabs scroll or wrap acceptably.
- [ ] Large touch mode is usable on phone.
- [ ] Extra large touch mode does not cause severe overlap.
- [ ] Board category tabs are usable on phone.


## v24 Clean GUI checks

- [ ] Skip link appears when focused by keyboard.
- [ ] Student panel layout Open shows panels directly.
- [ ] Student panel layout Grouped shows Start tools and Help tools groups.
- [ ] Student panel layout Minimal keeps groups collapsed by default.
- [ ] Student display summary strip can be hidden.
- [ ] Focus outlines are clearly visible.
- [ ] Board-only mode remains simple.
- [ ] First/Then-only mode remains simple.
- [ ] Mobile layout does not crowd grouped panel summaries.


## v25 preset checks

- [ ] Simple visual schedule preset applies clean Student Mode.
- [ ] AAC / communication board preset opens Board-only layout.
- [ ] First / Then support preset opens First/Then-only layout.
- [ ] Transition and regulation support preset shows help/break/transition tools.
- [ ] Advanced preset restores all major Student Mode tools.
- [ ] Presets update independence settings as expected.
- [ ] Preview Student Mode button opens Student Mode.


## v27 refactor regression checks

- [ ] Read-aloud still ignores decorative emoji.
- [ ] Student completion audio feedback still works when enabled.
- [ ] Supabase save/load errors still display helpful messages.
- [ ] Copy schedule to tomorrow still works.
- [ ] Copy schedule to weekdays still works.
- [ ] Goal CSV export still downloads.
- [ ] Support event CSV export still downloads.
- [ ] Prompt-level CSV export still downloads.
- [ ] Single-profile backup still downloads.
- [ ] Full workspace backup still downloads.


## v28 hook refactor regression checks

- [ ] Theme toggle still switches light/dark mode.
- [ ] Read-aloud still works when enabled.
- [ ] Read-aloud still ignores decorative emoji.
- [ ] Old saved studentViewMode values still migrate from builder to schedule.
- [ ] Supabase session still loads on refresh.
- [ ] Supabase sign-in still opens Staff Mode.
- [ ] Unsaved cloud changes warning still appears after local edits.
- [ ] Cloud save clears unsaved warning.
- [ ] Cloud load marked clean does not immediately show unsaved warning.


## v29 action hook regression checks

- [ ] Copy current schedule to tomorrow still works.
- [ ] Copy current schedule to weekdays still works.
- [ ] Weekly report downloads.
- [ ] Handoff report downloads.
- [ ] Normalized JSON export downloads.
- [ ] Goal CSV downloads.
- [ ] Support event CSV downloads.
- [ ] Prompt-level CSV downloads.
- [ ] Single-profile backup downloads.
- [ ] Add/update/delete progress goal works.
- [ ] Add/update/delete/reset visual library item works.
- [ ] Student check-in records.
- [ ] Reward request records.
- [ ] Reinforcement settings save.
- [ ] Regulation plan saves.
- [ ] Session note saves.


## v30 final refactor regression checks

- [ ] Staff sign-up/sign-in/sign-out still works.
- [ ] Profile add/select/update/delete/reset works.
- [ ] Student Mode / Staff Mode toggle works.
- [ ] Theme toggle works.
- [ ] Schedule date changes update schedule and documentation date.
- [ ] Communication board management works.
- [ ] Daily notes copy/download works.
- [ ] Activity CSV downloads.
- [ ] Backup export/import works.
- [ ] Cloud save/load works.
- [ ] Add activity works.
- [ ] Complete activity/step works.
- [ ] Add/update/delete/move steps works.
- [ ] Student Choices bank works.
- [ ] Templates save/apply/delete work.
- [ ] Transition/accessibility/security/role settings save.
- [ ] First/Then builder works.


## v31 communication/regulation checks

- [ ] Student Mode shows Communication tools group when enabled.
- [ ] Pain/body board records support event.
- [ ] Sensory request button records support event.
- [ ] Regulation pathway records feeling/need/ready events.
- [ ] Waiting support reason records support event.
- [ ] Waiting support activity records support event.
- [ ] Waiting timer renders.
- [ ] Staff can add sensory request.
- [ ] Staff can remove sensory request.
- [ ] Staff can adjust waiting timer.
- [ ] Display toggles can hide pain/body panel.
- [ ] Display toggles can hide sensory panel.
- [ ] Display toggles can hide regulation pathway.
- [ ] Display toggles can hide waiting support.


## v32 self-advocacy checks

- [ ] Student Mode shows Self-advocacy tools group when enabled.
- [ ] Yes / No / Maybe board records support event.
- [ ] Help request builder records topic/action support event.
- [ ] Decision support switches between 2-choice and 3-choice mode.
- [ ] Decision support records selected choice.
- [ ] I'm stuck pathway records reason/strategy.
- [ ] Schedule change request records current activity when available.
- [ ] Staff can add help topic.
- [ ] Staff can remove help topic.
- [ ] Staff can add decision choice.
- [ ] Staff can remove decision choice.
- [ ] Display toggle can hide yes/no panel.
- [ ] Display toggle can hide help request builder.
- [ ] Display toggle can hide decision support.
- [ ] Display toggle can hide stuck pathway.
- [ ] Display toggle can hide schedule change request.


## v33 communication history / mobile / guided builder checks

- [ ] Staff Mode → Notes shows Communication history.
- [ ] Communication history summarizes v31/v32 support events.
- [ ] Communication history shows category counts.
- [ ] Communication history shows repeated messages.
- [ ] Communication history shows recent communication events.
- [ ] Student Mode → Choose shows Build my day when schedule building is enabled.
- [ ] Guided builder hides when student schedule building is disabled.
- [ ] Guided builder lets student choose Start activity.
- [ ] Guided builder lets student choose Work / school activity.
- [ ] Guided builder lets student choose Break activity.
- [ ] Guided builder lets student choose Reward / fun activity.
- [ ] Add selected to schedule adds chosen bank activities.
- [ ] Student mobile quick nav appears on phone width.
- [ ] Student mobile quick nav changes tabs.
- [ ] Student mobile quick nav respects available tabs/presets.


## v39 leap forward checks

- [ ] Student Mode shows Life skills tools group when enabled.
- [ ] Community access card records support event.
- [ ] Community safety steps display.
- [ ] Vocational task button records support event.
- [ ] Staff can add/remove community card.
- [ ] Staff can add/remove vocational action.
- [ ] Goal-aware recommendations display in Notes.
- [ ] Recommendations respond to support event patterns.
- [ ] Caregiver handoff generator accepts notes.
- [ ] Caregiver handoff copy button works.
- [ ] Backend normalization readiness panel appears in Save.
- [ ] Normalization panel does not claim production readiness.
- [ ] Display toggle can hide community access panel.
- [ ] Display toggle can hide vocational task mode.


## v40 release-candidate checks

- [ ] FeaturePresetPanel appears in Staff Mode → Students.
- [ ] Each feature preset applies without errors.
- [ ] Applied preset changes Student Mode layout.
- [ ] StaffFeatureGuidePanel appears on Dashboard.
- [ ] Feature guide Open buttons switch Staff tabs.
- [ ] FEATURE_MAP.md exists.
- [ ] RELEASE_CANDIDATE_CHECKLIST.md exists.
- [ ] Mobile quick nav still appears on phone width.
- [ ] v31-v39 features remain available after presets.
- [ ] Advanced full support preset exposes all major Student Mode tool groups.


## v41 self-advocacy passport checks

- [ ] Student Mode shows About Me profile when enabled.
- [ ] Staff can edit About Me fields.
- [ ] About Me export copies text.
- [ ] Staff observation log saves observation.
- [ ] Observation log can link to activity.
- [ ] Activity support pattern panel shows saved observations.
- [ ] Activity support pattern panel shows communication-linked activity events.
- [ ] New profile includes lifeSkillsSettings.
- [ ] New profile includes aboutMeProfile.
- [ ] Imported profile normalizes aboutMeProfile and supportObservations.
- [ ] Feature presets include About Me panel setting.


## v42 activity readiness checks

- [ ] Student Mode shows Activity readiness tools when enabled.
- [ ] Activity prep records activity-prep event.
- [ ] Activity reflection records activity-reflection event.
- [ ] Try-again-later records try-again-later event.
- [ ] Staff Notes shows Activity readiness review.
- [ ] Staff Notes shows Try-again-later queue.
- [ ] Readiness review summarizes prep/reflection/try-later counts.
- [ ] Display toggles can hide activity prep.
- [ ] Display toggles can hide activity reflection.
- [ ] Display toggles can hide try-again-later tool.
- [ ] Feature presets include activity readiness settings.


## v43 alternative access checks

- [ ] Student Mode shows Alternative access and calm tools when enabled.
- [ ] Calm screen records calm-screen event.
- [ ] Communication repair records communication-repair event.
- [ ] Switch scanning Start/Pause works.
- [ ] Switch scanning Select highlighted records switch-scan-select event.
- [ ] Staff Mode → Students shows alternative access guide.
- [ ] Display toggles can hide calm screen.
- [ ] Display toggles can hide communication repair.
- [ ] Display toggles can hide switch scanning.
- [ ] Alternative access / eye gaze preset applies.
- [ ] Calm-first reduced choice preset applies.
- [ ] Eye-gaze friendly mode increases target spacing/size.


## v43.1 prototype warning checks

- [ ] Student Mode shows bottom prototype warning footer.
- [ ] Staff Mode shows bottom prototype warning footer.
- [ ] Footer says not HIPAA certified.
- [ ] Footer says not FERPA certified.
- [ ] Footer says do not use real student/client data.
- [ ] Footer is readable in light mode.
- [ ] Footer is readable in dark mode.


## v44 AAC expansion checks

- [ ] Student Mode shows AAC expansion tools when enabled.
- [ ] Core words board records aac-core-word event.
- [ ] Quick phrases board records aac-quick-phrase event.
- [ ] Feelings/intensity board records aac-feeling event.
- [ ] Social scripts board records aac-social-script event.
- [ ] Staff Mode → Students shows AAC expansion editor.
- [ ] Staff can add/remove core words.
- [ ] Staff can add/remove quick phrases.
- [ ] Staff can add/remove feelings.
- [ ] Staff can add/remove social scripts.
- [ ] Display toggles can hide AAC expansion panels.
- [ ] Expanded AAC communication preset applies.
- [ ] Prototype HIPAA/FERPA footer still appears in Student and Staff Mode.


## v45 icon library checks

- [ ] Font Awesome dependencies appear in package.json.
- [ ] Staff Mode → Choices shows Icon library.
- [ ] Staff can filter/search curated icons.
- [ ] Staff can add a Font Awesome icon to Visual Library.
- [ ] Saved Font Awesome visual renders in Visual Library.
- [ ] AAC expansion buttons show icons when icon value exists.
- [ ] AAC expansion buttons still show visible text labels.
- [ ] AAC event logs still use text labels.
- [ ] Staff AAC expansion editor can choose an icon for new items.
- [ ] Emoji fallback still works when no icon is set.
- [ ] Prototype HIPAA/FERPA footer still appears in Student and Staff Mode.


## v46 universal symbol label checks

- [ ] Staff can edit an existing AAC item label.
- [ ] Staff can edit an existing AAC item emoji fallback.
- [ ] Staff can select/change an existing AAC item Font Awesome icon.
- [ ] Staff AAC editor shows visual preview.
- [ ] Student AAC boards still show labels under visuals.
- [ ] Calm screen still shows labels under visuals.
- [ ] Communication repair still shows labels under visuals.
- [ ] Activity prep/reflection still show labels under visuals.
- [ ] Switch scanning still shows labels under visuals.
- [ ] Event logs still use text labels.
- [ ] Prototype HIPAA/FERPA footer still appears in Student and Staff Mode.


## v47 communication visual customization checks

- [ ] Staff can edit sensory request label/emoji/icon.
- [ ] Staff can edit yes/no response label/emoji/icon.
- [ ] Staff can edit help topic label/emoji/icon.
- [ ] Staff can edit help action label/emoji/icon.
- [ ] Staff can edit decision choice label/emoji/icon.
- [ ] Staff can edit stuck reason label/emoji/icon.
- [ ] Staff can edit schedule change request label/emoji/icon.
- [ ] Staff can edit community card label/emoji/icon.
- [ ] Staff can edit vocational action label/emoji/icon.
- [ ] Student sensory panel keeps visible labels.
- [ ] Student yes/no panel keeps visible labels.
- [ ] Student help builder keeps visible labels.
- [ ] Student community/vocational panels keep visible labels.
- [ ] Event logs still use labels, not icon names.
- [ ] Prototype HIPAA/FERPA footer still appears in Student and Staff Mode.


## v48 visual library assignment checks

- [ ] Staff can assign a saved Visual Library item to an AAC item.
- [ ] Staff can assign a saved Visual Library item to a sensory request.
- [ ] Staff can assign a saved Visual Library item to a yes/no response.
- [ ] Staff can assign a saved Visual Library item to a help topic/action.
- [ ] Staff can assign a saved Visual Library item to a community card.
- [ ] Staff can assign a saved Visual Library item to a vocational action.
- [ ] Assigned emoji visual renders on student button.
- [ ] Assigned Font Awesome visual renders on student button.
- [ ] Assigned uploaded image/photo visual renders on student button.
- [ ] Student button labels remain visible.
- [ ] Event logs still use text labels, not icon names or image names.
- [ ] Prototype HIPAA/FERPA footer still appears in Student and Staff Mode.


## v49 visual coverage audit checks

- [ ] Staff Mode → Students shows Communication visual audit.
- [ ] Audit shows total button count.
- [ ] Audit shows saved visual count.
- [ ] Audit shows Font Awesome icon count.
- [ ] Audit flags emoji-only/text-fallback items.
- [ ] Audit shows suggested icon names.
- [ ] Apply suggested icons adds icons to weak visual items.
- [ ] Saved image/photo visuals are not overwritten.
- [ ] Existing Font Awesome icons are not overwritten.
- [ ] Labels remain visible in Student Mode.
- [ ] Event logs still use labels, not icon names.
- [ ] Prototype HIPAA/FERPA footer still appears in Student and Staff Mode.


## v50 solid release candidate checks

- [ ] Staff can set visual preference to Balanced.
- [ ] Staff can set visual preference to Large visuals.
- [ ] Staff can set visual preference to Label-first.
- [ ] Staff can set visual preference to Labels only.
- [ ] Student Mode labels remain visible in every visual preference mode.
- [ ] Labels-only hides decorative symbols but keeps text labels.
- [ ] Staff Dashboard shows v50 release readiness panel.
- [ ] Release readiness panel shows ready/review checks.
- [ ] Release readiness panel includes manual QA steps.
- [ ] Visual coverage audit still works.
- [ ] Visual Library assignment still works.
- [ ] Font Awesome icons still render.
- [ ] Prototype HIPAA/FERPA footer still appears in Student and Staff Mode.
- [ ] No real student/client data is used during testing.


## v50.1 Render Fix Checks

- [ ] Render/Vite build no longer fails on invalid JSX.
- [ ] Student Yes/No panel opens.
- [ ] Student Sensory panel opens.
- [ ] Student Community Access panel opens.
- [ ] Student Vocational Task panel opens.
- [ ] Labels remain visible under visual symbols.


## v51 student navigation cleanup checks

- [ ] Student Mode shows Profile, Schedule, Choose, Make, Board, Relax, and Games where enabled.
- [ ] Schedule screen is less cluttered than old Today screen.
- [ ] Profile screen shows About Me/check-in/rewards/progress.
- [ ] Schedule screen shows date, activity support, First/Then, and schedule list.
- [ ] Board screen shows Choice Board plus AAC/self-advocacy tools.
- [ ] Relax screen shows help, break, sensory, regulation, waiting, calm, repair, and switch tools.
- [ ] Games screen shows placeholder and does not break navigation.
- [ ] Staff display settings include Profile/Schedule/Relax/Games tab controls.
- [ ] Build succeeds on Render.
- [ ] HIPAA/FERPA prototype footer remains visible.


## v51.1 Staff Mode Fix Checks

- [ ] Tapping Staff Mode does not show a white screen.
- [ ] Staff Dashboard loads.
- [ ] v50 release readiness panel appears.
- [ ] Students tab loads.
- [ ] Student Mode still loads after returning from Staff Mode.


## v51.2 Staff Auth Gate Checks

- [ ] Sign out.
- [ ] Tap Staff.
- [ ] Staff login/create-account screen appears.
- [ ] No white screen appears.
- [ ] Back to Student Mode works.
- [ ] Sign in and confirm Staff Dashboard loads.
- [ ] Sign out again and confirm Staff Auth Gate returns.


## v51.3 Navigation Symmetry Checks

- [ ] Student Mode shows 8 tabs: Profile, Schedule, Choose, Make, Board, Help, Relax, Games.
- [ ] Staff Mode shows 8 tabs: Dashboard, Setup, Students, Choices, Schedule, Notes, Reports, Save.
- [ ] Student and Staff tab bars visually match as 2x4 grids.
- [ ] Help tab opens and shows urgent support/self-advocacy tools.
- [ ] Relax tab opens and shows calm/regulation/sensory tools.
- [ ] Reports tab opens and shows progress, handoff, and pattern tools.
- [ ] Notes tab opens and focuses on documentation/observation entry.
- [ ] Staff Auth Gate still appears when signed out.
- [ ] Build succeeds on Render.


## v51.4 Duplicate Tabs Fix Checks

- [ ] Student Mode shows one tab bar, not two.
- [ ] Staff Mode shows one tab bar.
- [ ] Student tab bar still shows 8 tabs.
- [ ] Staff tab bar still shows 8 tabs.
- [ ] Help, Relax, and Games tabs still open.
- [ ] Staff Auth Gate still works when signed out.


## v52 Simple Games Pack Checks

- [ ] Games tab opens.
- [ ] Game picker shows 8 games.
- [ ] Rock Paper Scissors can play a round.
- [ ] Choice / Color Wheel can spin and show a result.
- [ ] Word Rescue reveals letters and uses no hangman imagery.
- [ ] Tic Tac Toe accepts X/O moves and detects wins/ties.
- [ ] Snake starts, pauses, moves, scores, and resets.
- [ ] Dino Jump starts, jumps, scores, ends, and resets.
- [ ] Memory Match flips cards and matches pairs.
- [ ] Float Bird starts, flaps, scores, ends, and resets.
- [ ] Student and Staff still show one 8-tab navigation bar.
- [ ] Staff Auth Gate still appears when signed out.
- [ ] Build succeeds on Render.


## v53 GUI Declutter Trial Checks

- [ ] Student Mode default shows Schedule, Talk, Help, and Calm.
- [ ] Student labels say Me, Talk, and Calm instead of Profile, Board, and Relax.
- [ ] Staff Mode shows Settings instead of Save.
- [ ] Staff Dashboard shows the v53 GUI review / declutter panel.
- [ ] Staff Students tab lets staff select Core, Simple, Communication, Builder, Full, or Custom navigation.
- [ ] Full preset shows Me, Schedule, Choose, Make, Talk, Help, Calm, and Games.
- [ ] Games still work when Games is enabled.
- [ ] Staff Auth Gate still appears when signed out.
- [ ] Build succeeds on Render.


## Version feature file check

- [ ] `VERSION_FEATURES.md` exists.
- [ ] The ZIP does not contain scattered `V##_...md` report files.
- [ ] README, CODE_EXPLANATION, QA_CHECKLIST, and ROADMAP still exist.


## v53.1 Choice Wheel Checks

- [ ] Open Student Mode with Games enabled.
- [ ] Open Games → Choice Wheel.
- [ ] Edit each color label.
- [ ] Press Spin and confirm the wheel visually rotates.
- [ ] Confirm the result shows the selected custom label.
- [ ] Confirm Reset labels restores color defaults.
- [ ] Other games still open.


## v53.2 Choice-to-Schedule Checks

- [ ] Student Mode Core preset shows Schedule, Add, Talk, Help, Calm.
- [ ] Schedule tab shows Add to schedule / Pick something to do.
- [ ] Pressing an activity choice adds it to the schedule.
- [ ] Add tab opens and also lets the student add activities.
- [ ] Talk remains communication-focused, not schedule-building.
- [ ] Staff Choices tab clearly describes activities the student can add.
- [ ] Empty state explains staff must add activity choices first.
- [ ] v52 games still work when enabled.
- [ ] Staff Auth Gate still appears when signed out.
