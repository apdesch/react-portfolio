import React from "react";
import styled from "styled-components";
import { useEditor, EditorContent, CommandProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiHeading,
  BiParagraph,
  BiCode,
  BiCodeBlock,
  BiListUl,
  BiListOl,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiAlignJustify,
  BiBlock,
  BiImage,
} from "react-icons/bi";

interface SelectOption {
  value: string;
  label: string;
}

interface FieldProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  onChange?: Function;
}

const FormRow = styled.div`
  display: flex;
  label {
    width: 140px;
    text-align: right;
    padding: 10px;
  }
  .ctrl-bar {
    display: flex;
    padding: 0 10px;
    background-color: #5f5f5f;
    border-radius: 4px 4px 0 0;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      font-size: 16px;
      padding: 0;
      width: 32px;
      height: 36px;
      color: #ffffff;
    }
  }
  .ProseMirror {
    padding: 16px;
    width: 100%;
    min-height: 150px;
    overflow: auto;
    background-color: #ffffff;
    color: #121212;
  }
`;

const EditorNav: React.FC<CommandProps | { editor: any }> = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <nav id="ctrlbar" className="ctrl-bar">
      <button
        title="Bold"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        <BiBold />
      </button>
      <button
        title="Italic"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <BiItalic />
      </button>
      <button
        title="Underline"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <BiUnderline />
      </button>
      <button
        title="Heading"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <BiHeading />
      </button>
      <button
        title="Paragraph"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
      >
        <BiParagraph />
      </button>
      <button
        title="Code"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
      >
        <BiCode />
      </button>
      <button
        title="Code Block"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
      >
        <BiCodeBlock />
      </button>
      <button
        title="Bullet List"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <BiListUl />
      </button>
      <button
        title="Numbered List"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <BiListOl />
      </button>
      <button
        title="Align Left"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
      >
        <BiAlignLeft />
      </button>
      <button
        title="Align Center"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
      >
        <BiAlignMiddle />
      </button>
      <button
        title="Align Right"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
      >
        <BiAlignRight />
      </button>
      <button
        title="Align Justify"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().setTextAlign("justify").run();
        }}
      >
        <BiAlignJustify />
      </button>
      <button
        title="Remove Formating"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().clearNodes().run();
        }}
      >
        <BiBlock />
      </button>
      <button title="Add Image" onClick={addImage}>
        <BiImage />
      </button>
    </nav>
  );
};

const Field: React.FC<FieldProps> = ({
  type,
  name,
  placeholder,
  options,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Image, Underline, TextAlign],
    content: "<p>Hello World!</p>",
  });

  switch (type) {
    case "editor":
      return (
        <div>
          <EditorNav editor={editor} />
          <EditorContent editor={editor} />
        </div>
      );
    case "textarea":
      return <textarea name={name} placeholder={placeholder} />;
    case "select":
      return (
        <select name={name}>
          {options?.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
        />
      );
  }
};

const FormField: React.FC<FieldProps> = ({
  name,
  label,
  type,
  placeholder,
  options,
  onChange,
}) => (
  <FormRow>
    <label htmlFor={name}>{label}</label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
    />
  </FormRow>
);

export default FormField;
