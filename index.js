const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;

const lockfile = '.undp_zurb_template_lock';

const target = path.resolve('../../../');
const project = path.basename(target);

// valid directory name found
if (project != '') {

  // check if it wasn't deployed already to avoid file overwrite
  fs.stat(target + path.sep + lockfile, (err) => {

    if (err) {

      // no lock file - good to go
      ncp.limit = 5;
      ncp('./deploy', target, function (err) {

        if (err) throw err;

        // update new package description
        fs.readFile(target + path.sep + 'package.json.default', (err, data) => {
          if (err) throw err;
          fs.writeFile(target + path.sep + 'package.json', data.toString().split('{name}').join(project), (err) => {if (err) throw err;});
          fs.writeFile(target + path.sep + lockfile, new Date().toISOString(), (err) => {if (err) throw err;});
        });

        console.log('done. Please run "npm install"');
      });
    } else {
      return console.log('Already deployed, finish this');
    }
  });
}
