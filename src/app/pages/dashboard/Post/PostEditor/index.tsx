import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {Image, ImageResize, ImageResizeEditing, ImageResizeHandles} from '@ckeditor/ckeditor5-image'
import {MediaEmbed} from '@ckeditor/ckeditor5-media-embed'
// import {ImageResizeEditing} from '@ckeditor/ckeditor5-image'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {uploadAdapter} from 'src/app/helpers/image-upload'
import {API_URL, APP_PUBLIC_URL} from 'src/app/modules/auth/core/_requests'
// import {ImageResizeEditing, ImageResizeHandles} from '@ckeditor/ckeditor5-image'
type Props = {}

const PostEditor = (props: Props) => {
  const {control} = useFormContext()

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader)
    }
  }
  return (
    <Controller
      name='content'
      control={control}
      render={({field: {onChange, value}}) => (
        <div id='editor-container'>
          <CKEditor
            config={{
              extraPlugins: [uploadPlugin],
              mediaEmbed: {
                previewsInData: true,
              },
            }}
            editor={ClassicEditor}
            data={value}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor)
            }}
            onChange={(event, editor) => {
              let data = editor.getData()
              const regex = /(https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+)/g
              data = data.replace(regex, '$1?autoplay=1')
              console.log('data==', data)
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
