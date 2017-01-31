const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();
const hostPackage = path.join(cwd, './package.json');

const packageRaw = fs.readFileSync(hostPackage, { encoding: 'utf8' });
const packageJSON = JSON.parse(packageRaw);
const merc = path.join(__dirname, '../../../node_modules/.bin/merc');

// If the package.json file has an _id property, Mercenary is being installed
// as a dependency, and we should run the postinstall script.
// eslint-disable-next-line
if (packageJSON._id) {
  cp.execSync(`"${merc}" --setup`);
}
