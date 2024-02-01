/**
 * This file is used in a github action, to identify the next version.
 * This is normally not needed to release our libraries, but because we want to version our docs as well using the same number.
 * I use this to first calculate it & store it for later usage.
 */

const { releaseVersion } = require('nx/release');

(async () => {
  try {
    const { workspaceVersion } = await releaseVersion({
      verbose: false,
      dryRun: true,
    });
    console.log('next version is: ', workspaceVersion);
    console.log(`::set-output name=next-version::${workspaceVersion}`);
  } catch (error) {
    console.error('Error occurred:', error.message);
    process.exit(1); // Exit with a non-zero status code to indicate failure
  }
})();
