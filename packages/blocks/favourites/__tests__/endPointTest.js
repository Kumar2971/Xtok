const { exec } = require("child_process");
const config = require('../src/config')
const host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

const cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.favouritesApiEndPoint} --method GET`

console.log(cmd);

exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`EndPoint Failed::${error}`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

var data = JSON.stringify({
    "data": {
        "favouriteable_id": 3,
        "favouriteable_type": "AccountBlock::Account"
    }
    })


exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.favouritesApiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Failed`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});