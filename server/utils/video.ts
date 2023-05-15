// import { join } from "path";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import { spawn } from "child_process";

// import { APP_ROOT } from "../app";
export const createVideoThumbnail = async (payload: {
  input: string;
  output: string;
}) => {
  try {
    const { input, output } = payload;
    const flags = [
      "-ss",
      "00:00:05",
      "-i",
      input,
      "-frames:v",
      "1",
      "-vf",
      "scale=480:-2",
      output,
    ];
    const process = new Promise<void>((resolve, reject) => {
      const ffmpeg = spawn("/usr/bin/ffmpeg", flags);
      ffmpeg.once("error", reject);
      ffmpeg.stderr.on("data", (data: string) => {
        console.debug(data.toString());
      });
      ffmpeg.on("exit", (code) => {
        if (code != 0) reject(new Error(`Returned exit code ${code}`));
        else resolve();
      });
    });

    return await process;
  } catch (error) {
    console.error(error);
  }
};
