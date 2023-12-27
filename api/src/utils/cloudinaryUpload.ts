import cloudinary from '../config/cloudinaryConfig'

async function cloudinaryUpload (file: any): Promise<string> {
  return await new Promise((resolve, reject) => {
    const filebase64 = file.buffer.toString('base64')
    const finalFile = `data:${file.mimetype};base64,${filebase64}`
    cloudinary.uploader.upload(finalFile, (err: any, result: string) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
};

export default cloudinaryUpload
