# Mono repo for UI components

## Architecture

This mono repo contains 1 application (our documentation website) and multiple publishable libraries. Each library could also contain multiple entry points, specifically for testing if needed.

## How to's

### perform a release

**Step 1: generate changelog**
On a new feature branch, execute the command:

```cmd
npx nx release changelog [specific version] --git-remote --git-tag=true
```

> Tip: if you don't know the version, you can always add `--dry-run`, to check what is inside.

**Step 2: Check if all libraries are synced**
run the command:

```cmd
npm run nx run-many -- -t lint
```

**Step 3: check if everything is ok for documentation**
optional step
