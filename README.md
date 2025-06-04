# Only Video

[![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)

Chrome extension to hide everything except video elements.

## Prerequisites

This project uses the latest Node.js LTS release (v22). The repository includes
an `.nvmrc` file, so running `nvm use` will automatically select the correct
version.

## Installing from Releases

Automated GitHub releases include a prebuilt copy of the extension and an auto-generated changelog describing the changes.
To install:

1. Visit the [releases page](../../releases) and download the `only-video.zip` file from the latest release.
2. Extract the archive to a folder on your computer.
3. Open `chrome://extensions` in Chrome and enable **Developer mode**.
4. Choose **Load unpacked** and select the extracted folder.
Updates will also be available from the same releases page.

Chrome will load the extension from that directory.

## Building Locally

Run the following commands to build the extension yourself:

```bash
npm install
npm run build
```

The compiled extension will be in the `dist/` directory.

## Incrementing the Version

Run `npm version <patch|minor|major>` to bump the project version. The `version` script will automatically update `public/manifest.json` so its version matches `package.json`.


