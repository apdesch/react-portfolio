import fs from "fs/promises";
import gm from "gm";
import sharp from "sharp";

type ExtMap = {
  [key: string]: string;
};

type SizeMap = {
  [key: string]: number;
};

export type ImageSize = "small" | "detail" | "large" | "thumb";

export type Size = [number, number];

const sizes: SizeMap = {
  small: 480,
  detail: 800,
  large: 1920,
  thumb: 240,
};

/**
 *
 * @param width width of original image
 * @param height height of original image
 * @param maxResize the maximum size of the resized image
 */
export const setResizeDimensions = (
  width: number,
  height: number,
  maxResize: number,
): [number, number] => {
  const ratio = width / height;
  let resizeWidth = maxResize;
  let resizeHeight = maxResize;
  // set new sizes
  if (1 > ratio) resizeWidth = resizeHeight * ratio;
  else resizeHeight = resizeWidth / ratio;
  // keep original size if smaller than new size
  if (width < maxResize && height < maxResize) {
    resizeWidth = width;
    resizeHeight = height;
  }
  return [Math.round(resizeWidth), Math.round(resizeHeight)];
};

export const getExtensionFromMimetype = (mimetype: string) => {
  const map: ExtMap = {
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "video/mp4": "mp4",
  };
  return map[mimetype] || "";
};

export const createResizedImage = async (
  filename: string,
  size: ImageSize,
): Promise<[number, number]> => {
  const dest = "./uploads/";
  const buffer = sharp(`${dest}/${filename}`);
  const { width, height, hasAlpha } = await buffer.metadata();
  if (width && height) {
    const [resizeWidth, resizeHeight] = setResizeDimensions(
      width,
      height,
      sizes[size],
    );
    await fs.mkdir(`${dest}/${size}`, { recursive: true });
    await buffer[hasAlpha ? "png" : "jpeg"]()
      .resize(resizeWidth, resizeHeight)
      .toFile(`${dest}/${size}/${filename}`);

    return [resizeWidth, resizeHeight];
  }
  return [0, 0];
};

export const createPDFThumbnail = async (filename: string) => {
  const thumb = new Promise((resolve, reject) => {
    gm(`./uploads/${filename}`)
      .setFormat("png")
      .resize(sizes["thumb"], sizes["thumb"])
      .write(
        `./uploads/thumb/${filename}.png`,
        (error, stdout, stderr, command) => {
          if (!error) resolve(command);
          else reject(error);
        },
      );
  });
  await thumb;
};
