import { Model } from "mongoose";

const duplicateCollectionItem = async <ModelType, ItemType>(
  model: Model<ModelType>,
  item: ItemType,
  message?: string,
) => {
  try {
    const result = await model.findOne(item);
    if (result) throw new Error(message || "{VALUE} is a duplicate entry");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw error;
  }
};

export { duplicateCollectionItem };
