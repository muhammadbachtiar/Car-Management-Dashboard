import cloudinary from "../config/cloudinaryConfig";

function cloudinaryUpload(file : any){
    return new Promise((resolve, reject) => {
      const filebase64 = file.buffer.toString('base64');
      const finalFile = `data:${file.mimetype};base64,${filebase64}`;
      cloudinary.uploader.upload(finalFile, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  
module.exports = cloudinaryUpload;

