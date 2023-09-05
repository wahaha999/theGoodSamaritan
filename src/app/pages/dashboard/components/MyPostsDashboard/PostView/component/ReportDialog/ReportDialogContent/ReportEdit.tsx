import {Grid, Typography} from '@mui/material'
import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import {uploadAdapter} from 'src/app/helpers/image-upload'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

type Props = {}

const ReportEdit = (props: Props) => {
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
      defaultValue={''}
      render={({field: {onChange, value}}) => (
        <div id='editor-container'>
          <Typography sx={{mb: 2}}>
            Please provide any additional details for your concern
          </Typography>
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
              onChange(data)
            }}
          />
        </div>
      )}
    />
  )
}

export default ReportEdit
