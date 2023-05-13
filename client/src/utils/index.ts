export const getImageURL = (imageName = "", sizeIndex = -1) => {
  if (!imageName) return "";
  if (imageName.includes("/")) return imageName;
  const sizes = ["thumb", "small", "large"];
  const dirName = sizes[sizeIndex] ? sizes[sizeIndex] + "/" : "";
  return `/uploads/${dirName}${imageName}`;
};

export const getDateFormat = (date: Date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (1 + d.getMonth()).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const projectFields = [
  {
    type: "text",
    name: "title",
    label: "Project Title",
    placeholder: "",
  },
  {
    type: "text",
    name: "description",
    label: "Description",
    placeholder: "",
  },
  {
    type: "text",
    name: "company",
    label: "Company",
    placeholder: "",
  },
  {
    type: "date",
    name: "date",
    label: "Completed",
    placeholder: "",
  },
  {
    type: "select",
    name: "type",
    label: "Type",
    placeholder: "",
    options: [
      { value: "engineering", label: "Software Engineering" },
      { value: "design", label: "Design" },
      { value: "film", label: "Film" },
      { value: "animation", label: "Animation" },
      { value: "illustration", label: "Illustration" },
    ],
  },
  {
    type: "url",
    name: "url",
    label: "Project Link",
    placeholder: "",
  },
  {
    type: "text",
    name: "skills",
    label: "Skills",
    placeholder: "",
  },
  {
    type: "text",
    name: "tags",
    label: "Tags",
    placeholder: "",
  },
  {
    type: "text",
    name: "image",
    label: "Banner Image",
    placeholder: "",
  },
  {
    type: "editor",
    name: "body",
    label: "Body",
    placeholder: "",
  },
];

export const assetUrl = (
  filename: string,
  size?: "small" | "large" | "thumb",
) => {
  return `/uploads/${size ? size + "/" : ""}${filename}`;
};

export interface Item {
  [key: string]: any;
}

export interface GroupedItems {
  [key: string]: Item[];
}

export const groupArrayItemsByKey = (
  array: Item[],
  key: string,
  groupName?: string,
): GroupedItems => {
  const filtered = (item: Item) =>
    JSON.parse(JSON.stringify(array))
      .filter((x: Item) => x[key] === item[key])
      .map((x: Item) => {
        delete x[key];
        return x;
      });
  return Object.assign(
    {},
    ...array.map((item) => {
      if (!item[key]) return;
      return {
        [item[key]]: groupName
          ? { [groupName]: filtered(item) }
          : filtered(item),
      };
    }),
  );
};
