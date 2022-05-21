export const getImageURL = (imageName = "", sizeIndex = -1) => {
  if (!imageName) return "";
  const sizes = ["thumb", "small", "large"];
  const dirName = sizes[sizeIndex] ? sizes[sizeIndex] + "/" : "";
  return `/uploads/${dirName}${imageName}`;
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
    type: "editor",
    name: "body",
    label: "Body",
    placeholder: "",
  },
];
