import { Request, Response } from "express";
import multer from 'multer';

// multer upload
const allowedImagesExts = ['jpg', 'png', 'gif', 'jpeg'];
const destination = './public';
const filename = (req, file, cb) => cb(null, file.originalname);
const fileFilter =  (req, file, cb) => cb(null, allowedImagesExts.find(ext => ext.includes( file.originalname.split('.').pop().toLowerCase() )) );
const storage = multer.diskStorage({ destination, filename });
export const upload = multer({ storage, fileFilter });

interface UploadI {
  uploadImage: (Request, Response) => Promise<void>;
}

class UploadController implements UploadI {

  constructor() { }

  public async uploadImage (req: Request, res: Response) {
    if (!req.file) {
      res.statusMessage = 'File is required for uploading';
      res.sendStatus(400);
    }

    const originalImage = `${destination}/${req.file.originalname}`;

    res.send({ fileName: originalImage });
  }

}

export default UploadController;
