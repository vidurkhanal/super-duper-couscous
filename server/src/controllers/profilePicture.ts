import Express, { Response, Request } from "express";
import fs from "fs";
import util from "util";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import { uploadToCloudinary } from "../utility/cloudinaryConfig";
import { Session, SessionData } from "express-session";
import { User } from "../models/user";

const router = Express.Router();

const unlinkFile = util.promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/profilePicture",
  upload.single(""),
  async (
    req: Request & {
      session: Session & Partial<SessionData> & { userID?: string };
    },
    res: Response
  ) => {
    const { file } = req;
    const { userID } = req.session;

    if (file) {
      const { secure_url } = await uploadToCloudinary(file.path);

      await User.update(
        { userID },
        {
          profilePictureUrl: secure_url,
        }
      );

      await unlinkFile(file.path);

      res.send(true);
    }

    res.send(false);
  }
);

export default router;
