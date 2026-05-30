# lifechange-rn

## Overview

lifechange-rn is the React Native application for the lifechange product, with
shared app code in `src/` and platform-specific files under `android/`.

## Structure

* `src/assets/` contains shared assets and helpers
* `src/containers/` and `src/widgets/` contain screen-level and reusable UI code
* `src/exports/` and `src/schemas/` contain shared imports and app contracts
* `android/` contains the native Android project files

## Notes

* The repository keeps app logic in `src/` and platform details in the native tree.
* Build-time local files are intentionally excluded.
