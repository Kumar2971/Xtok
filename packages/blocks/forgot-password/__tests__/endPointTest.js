const { exec } = require("child_process");

const config = require('../src/config')
const host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');        

const data = JSON.stringify({
    data: {
        token: "",
        new_password: ""
    }
});

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.passRecoveryChangePasswordAPiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Returned Error: ${error}`);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.passRecoveryStartOtpAPiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Returned Error: ${error}`);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});