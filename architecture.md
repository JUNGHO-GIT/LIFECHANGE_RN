# lifechange-rn Architecture

## Structure Map

```text
lifechange-rn
|-- index.js         -> React Native entry
|-- src/
|   |-- containers/  -> screen-level composition
|   |-- widgets/     -> reusable UI units
|   |-- schemas/     -> contracts and shared models
|   |-- imports/     -> import aggregation helpers
|   `-- assets/      -> shared app assets
|-- android/         -> native Android project
`-- app.json         -> application metadata
```

## Flow Map

```text
React Native entry
  -> shared modules load from src/
  -> containers assemble widgets and schemas
  -> Android project packages the shared app
  -> device runtime executes the app bundle
```

## Boundaries

- `src/` is the shared mobile application surface.
- `android/` contains platform-specific native files.
- Build artifacts and local release files are excluded.