import bcrypt from "bcrypt";

function checkPassword(encryptedPassword: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err : any, isPasswordCorrect: any) => {
        if (!!err) {
        
          reject(err);
          return;
        }
  
        resolve(isPasswordCorrect);
      });
    });
  }

module.exports = checkPassword;
