import React from "react";
import { BiBold } from "@react-icons/all-files/bi/BiBold";
import { BiItalic } from "@react-icons/all-files/bi/BiItalic";
import { BiUnderline } from "@react-icons/all-files/bi/BiUnderline";
import { BiHeading } from "@react-icons/all-files/bi/BiHeading";
import { BiParagraph } from "@react-icons/all-files/bi/BiParagraph";
import { BiCode } from "@react-icons/all-files/bi/BiCode";
import { BiCodeBlock } from "@react-icons/all-files/bi/BiCodeBlock";
import { BiListUl } from "@react-icons/all-files/bi/BiListUl";
import { BiListOl } from "@react-icons/all-files/bi/BiListOl";
import { BiAlignLeft } from "@react-icons/all-files/bi/BiAlignLeft";
import { BiAlignMiddle } from "@react-icons/all-files/bi/BiAlignMiddle";
import { BiAlignRight } from "@react-icons/all-files/bi/BiAlignRight";
import { BiAlignJustify } from "@react-icons/all-files/bi/BiAlignJustify";
import { BiBlock } from "@react-icons/all-files/bi/BiBlock";
import { BiImage } from "@react-icons/all-files/bi/BiImage";
import { BiLink } from "@react-icons/all-files/bi/BiLink";
import { CommandProps } from "@tiptap/react";

const EditorNav: React.FC<CommandProps | { editor: any }> = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.commands.setLink({ href: url });
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
        title="Remove Formatting"
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
      <button title="Add Link" onClick={addLink}>
        <BiLink />
      </button>
    </nav>
  );
};

export default EditorNav;
