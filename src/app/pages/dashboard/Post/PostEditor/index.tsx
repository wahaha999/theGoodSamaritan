import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'

type Props = {}

const PostEditor = (props: Props) => {
  const {control} = useFormContext()
  return (
    <Controller
      name='content'
      control={control}
      render={({field: {onChange, value}}) => (
        <div id='editor-container'>
          <CKEditor
            editor={ClassicEditor}
            data={value}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor)
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              onChange(data)
              // console.log({event, editor, data})
            }}
            // config={{
            //   plugins: [SimpleUploadAdapter],
            //   simpleUpload: {
            //     uploadUrl: 'http://127.0.0.1:8000/api/upload-image',
            //   },
            // }}
          />
        </div>
      )}
    />
  )
}

export default PostEditor
