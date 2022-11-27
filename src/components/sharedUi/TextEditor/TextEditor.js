import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ handleEditorChange }) => {
  const editorRef = useRef(null);
  // const handleEditorChange = (s) => {
  //   console.log(s);
  // };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        // value={}
        init={{
          height: 200,
          resize: false,
          menubar: false,
          plugins: ["wordcount"],
          toolbar: "undo redo bold italic forecolor removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) => handleEditorChange(e, editorRef.current.getContent())}
      />
    </>
  );
};

export default TextEditor;