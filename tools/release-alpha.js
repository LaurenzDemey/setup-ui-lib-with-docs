/**
 * The file is used for releasing an alpha version.
 * The only thing that happens is switching to the new version (not committed)
 * and publish using the "alpha" tag.
 */

const { releasePublish, releaseVersion } = require('nx/release');
const yargs = require('yargs');

(async () => {
  const options = await yargs(process.argv.slice(2))
    .version(false)
    .option('version', {
      description: 'it just uses this version, instead of auto calculating',
      type: 'string',
    })
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
    .requiresArg('version')
    .parseAsync();

  const { workspaceVersion } = await releaseVersion({
    specifier: options.version,
    stageChanges: false,
    dryRun: options.dryRun,
    verbose: options.verbose,
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
      tag: 'alpha',
    });
  }
})();
