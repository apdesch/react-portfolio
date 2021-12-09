export interface IAsset {
  id: string;
  timestamp: Date;
  url: string;
}

const Asset = {
  findOne: (id: string): IAsset => {
    const timestamp = new Date();
    return {
      id,
      timestamp,
      url: "http://apdesch.com/",
    };
  },
};

export default Asset;
