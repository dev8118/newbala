import { useState, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'

const CustomEditor = ({ value, setEditor, onChange }) => {
  let debounceTimeout
  const [editorState, setEditorState] = useState(value)

  const handleEditorChange = (ev, editor) => {
    const data = editor.getData()
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      setEditorState(data)
      onChange(data)
    }, 1000)
  }

  return (
    <CKEditor
      editor={Editor}
      config={{
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
          'highlight',
          'code',
          'imageUpload',
          'fontColor',
          'fontFamily',
          'fontSize',
          'alignment',
          'horizontalLine',
          'imageStyle:block',
          'imageStyle:side'
        ]
      }}
      data={editorState}
      onReady={editor => (setEditor(editor))}

      // onChange={handleEditorChange}
    />
  )
}

export default CustomEditor
