import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "paragraph",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "fullsize",
      ],
      // Styling to match the theme if possible
      style: {
        background: "transparent",
        color: "inherit",
      },
      height: 300,
    }),
    [placeholder],
  );

  return (
    <div className="jodit-editor-container dark:text-white">
      <style>
        {`
                .jodit-react-container .jodit-container {
                    border: 1px solid #e5e7eb;
                    border-radius: 0;
                }
                .dark .jodit-react-container .jodit-container {
                    background-color: #222222 !important;
                    border-color: #444444;
                    color: white !important;
                }
                .dark .jodit-toolbar__box {
                    background-color: #333333 !important;
                }
                .dark .jodit-toolbar-button__button {
                    color: white !important;
                }
                .dark .jodit-wysiwyg {
                    color: white !important;
                }
                 .dark .jodit-status-bar {
                    background-color: #333333 !important;
                    color: white !important;
                    border-top: 1px solid #444444 !important;
                }
                
                /* Override Tailwind preflight to restore list styles inside the editor */
                .jodit-wysiwyg ul {
                    list-style-type: disc !important;
                    padding-left: 2.5rem !important;
                }
                .jodit-wysiwyg ol {
                    list-style-type: decimal !important;
                    padding-left: 2.5rem !important;
                }
                `}
      </style>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)} // preferred for performance
        // onChange={newContent => onChange(newContent)} // less efficient
      />
    </div>
  );
};

export default RichTextEditor;
