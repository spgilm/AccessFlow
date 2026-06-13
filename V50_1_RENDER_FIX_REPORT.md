# AccessFlow v50.1 Render Fix Report

## Fixed

Render/Vite build failed because four student communication panels had invalid JSX syntax:

```jsx
aria-label=item.label
<IconSymbol item=item />
```

These were corrected to:

```jsx
aria-label={item.label}
<IconSymbol item={item} />
```

## Files patched

```txt
src/components/StudentYesNoPanel.jsx
src/components/StudentSensoryPanel.jsx
src/components/StudentCommunityAccessPanel.jsx
src/components/StudentVocationalTaskPanel.jsx
```

## Scope

No feature changes. This is a deployment/build fix for v50.
