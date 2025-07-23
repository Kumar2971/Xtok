const { exec } = require("child_process");
const config = require('../src/config')
const host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

const data = JSON.stringify({
    data: {
        token: "token",
    }
})

const cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.productAPiEndPoint}/1 --body '${data}' --method GET`

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

// POST
exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.productAPiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
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
