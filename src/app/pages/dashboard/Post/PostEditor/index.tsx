import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import {ImageResizeEditing} from '@ckeditor/ckeditor5-image'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import {Controller, useFormContext} from 'react-hook-form'
import {uploadAdapter} from 'src/app/helpers/image-upload'
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
              link: {
                defaultProtocol: 'https://',
                decorators: {
                  openInNewTab: {
                    mode: 'manual',
                    label: 'Open in a new tab',
                    attributes: {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    defaultValue: true,
                  },
                },
              },
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'indent',
                'outdent',
                '|',
                'imageUpload',
                'mediaEmbed',
                'undo',
                'redo',
              ],
              mediaEmbed: {
                previewsInData: true,
              },
            }}
            editor={ClassicEditor}
            data={value}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              let data = editor.getData()
              // const regex = /(https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+)/g
              // data = data.replace(regex, '$1?autoplay=1')
              onChange(data)
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
