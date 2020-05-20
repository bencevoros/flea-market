const { exec } = require("child_process");

class EmailController  {

  constructor() {}
  public async sendEmail(emailReq: any){

    let  command : string ="curl.exe --url smtp://smtp.gmail.com:587 --ssl-reqd --mail-from tripletgenerator@gmail.com --mail-rcpt "+emailReq.query.email+" --upload-file "+__dirname+"\\"+emailReq.query.type+"Template.txt --user tripletgenerator@gmail.com:AZv43x3M7.mV.PJ --insecure";
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log("email has been sent with type: "+emailReq.query.type);
    });
  }

  public async sendEmailFromBackEnd(email: any,type:any){

    let  command : string ="curl.exe --url smtp://smtp.gmail.com:587 --ssl-reqd --mail-from tripletgenerator@gmail.com --mail-rcpt "+email+" --upload-file "+__dirname+"\\"+type+"Template.txt --user tripletgenerator@gmail.com:AZv43x3M7.mV.PJ --insecure";
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log("email has been sent with type: "+type);
    });
  }

}

export default EmailController;