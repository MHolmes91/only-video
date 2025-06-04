# Repository Guidelines

- Always ensure that `package.json` and `public/manifest.json` share the same `version` field.
- Use `npm version <patch|minor|major>` to bump versions. This triggers the `version` script which updates the manifest.
- Run `npm test` before committing changes.
