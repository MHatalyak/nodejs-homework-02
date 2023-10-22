import path from "path";
import jimp from "jimp";
import fs from "fs/promises";

const __dirname = path.resolve();
const tmpFolderPath = path.join(__dirname, "tmp");
const avatarsFolderPath = path.join(__dirname, "public/avatars");

const resizeAndSaveAvatar = async (fileBuffer, userId) => {
  const image = await jimp.read(fileBuffer);
  await image
    .resize(250, 250)
    .writeAsync(path.join(tmpFolderPath, `${userId}.jpg`));

  const uniqueFileName = `${userId}-${Date.now()}.jpg`;
  await image.writeAsync(path.join(avatarsFolderPath, uniqueFileName));

  await fs.unlink(path.join(tmpFolderPath, `${userId}.jpg`));
  return `/public/avatars/${uniqueFileName}`;
};

export default resizeAndSaveAvatar;
