import multer from "multer";
import path from "path";

// const destination = path.resolve("temp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, cb) => {
//     const uinquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
//     const filename = `${uinquePreffix}_${file.originalname}`;
//     cb(null, filename);
//   },
// });

// const limits = {
//   fileSize: 5 * 1024 * 1024,
// };

// const uploadAvatar = multer({
//   storage,
//   limits,
// });

const storage = multer.memoryStorage();
const uploadAvatar = multer({ storage });

export default uploadAvatar;
