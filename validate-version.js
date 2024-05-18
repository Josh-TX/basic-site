const version = process.argv[2];
const semVerRegex = /^[0-9]+\.[0-9]+\.[0-9]+$/;
if (!semVerRegex.test(version)) {
  console.error(`Invalid version format: ${version}`);
  process.exit(1);
} else {
  console.log(`Valid version format: ${version}`);
}