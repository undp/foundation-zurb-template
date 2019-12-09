const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;

const lockfile = '.undp_zurb_template_lock';

const target = path.resolve('../../../');
const project = path.basename(target);

// valid directory name found
if (project != '') {

  // check if it wasn't deployed already to avoid file overwrite
  fs.stat(target + path.delimiter + lockfile, (err) => {

    if (err) {

      // no lock file - good to go
      ncp.limit = 5;
      ncp('./deploy', target, function (err) {
        if (err) {
          return console.error(err);
        }

        // update new package description
        fs.readFile(target + path.delimiter + 'package.json', (err, data) => {
          if (err) throw err;
          fs.writeFile(target + path.delimiter + 'package.json', data.replace('{name}', project));
          fs.writeFile(target + path.delimiter + lockfile, new Date.now().toISOString());
        });

        console.log('done');
      });
    } else {
      return console.log('Already deployed, finsih this');
    }
  });
}
