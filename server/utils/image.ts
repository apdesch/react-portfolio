import fs from "fs/promises";
import sharp from "sharp";

type ExtMap = {
  [key: string]: string;
};

type SizeMap = {
  [key: string]: number;
};

type ImageSize = "small" | "detail" | "large" | "thumb";

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
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "application/pdf": "pdf",
  };
  return map[mimetype] || "";
};

export const createResizedImage = async (filename: string, size: ImageSize) => {
  const sizes: SizeMap = {
    small: 480,
    detail: 800,
    large: 1920,
    thumb: 240,
  };
  const dest = "./uploads/";
  const buffer = sharp(`${dest}/${filename}`);
  const { width, height } = await buffer.metadata();
  if (width && height) {
    const [resizeWidth, resizeHeight] = setResizeDimensions(
      width,
      height,
      sizes[size],
    );
    await fs.mkdir(`${dest}/${size}`, { recursive: true });
    await buffer
      .jpeg()
      .resize(resizeWidth, resizeHeight)
      .toFile(`${dest}/${size}/${filename}`);
  }
};
