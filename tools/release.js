/**
 * This file is used to perform an official release using nx/release.
 * A new version is auto calculated and adapted in all package.json files (committed)
 * The CHANGELOG.MD globally is updated & a new release is published to github releases
 * Finally the npm packages are published to the npm registry
 *
 * based from: https://github.com/typescript-eslint/typescript-eslint/blob/82cb9dd580f62644ed988fd2bf27f519177a60bd/tools/release/release.mts
 */

const {
  releaseChangelog,
  releasePublish,
  releaseVersion,
} = require('nx/release');
const yargs = require('yargs');

(async () => {
  const options = await yargs(process.argv.slice(2))
    .version(false)
    .option('dryRun', {
      alias: 'd',
      description:
        'Whether to perform a dry-run of the release process, defaults to true',
      type: 'boolean',
      default: true,
    })
    .option('verbose', {
      description:
        'Whether or not to enable verbose logging, defaults to false',
      type: 'boolean',
      default: false,
    })
    .parseAsync();

  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    gitCommit: true,
    dryRun: options.dryRun,
    verbose: options.verbose,
  });

  // This will create a release on GitHub (based on the nx.json release settings)
  await releaseChangelog({
    versionData: projectsVersionData,
    version: workspaceVersion,
    dryRun: options.dryRun,
    verbose: options.verbose,
    gitCommit: true,
  });

  // An explicit null value here means that no changes were detected across any package
  if (workspaceVersion === null) {
    console.log(
      '⏭️ No changes detected across any package, skipping publish step altogether'
    );
  } else {
    await releasePublish({
      dryRun: options.dryRun,
      verbose: options.verbose,
    });
  }
})();
