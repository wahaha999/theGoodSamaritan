// src/CustomizeClassicEditor.js
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'

import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'

class CustomizeClassicEditor extends ClassicEditorBase {}

CustomizeClassicEditor.builtinPlugins = [
  Essentials,
  Bold,
  Italic,
  Paragraph,
  Heading,
  Link,
  List,
  Image,
  ImageToolbar,
  ImageUpload,
  ImageStyle,
  SimpleUploadAdapter
]

CustomizeClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'imageUpload',
      '|',
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
      'undo',
      'redo',
    ],
  },
  image: {
    toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
    styles: [
      'full',
      'alignLeft',
      'alignRight',
    ],
  },
  // simpleUpload: {
  //   // Configure your image upload endpoint here.
  //    uploadUrl: 'http://127.0.0.1:8000/api/upload-image',
  // },
}

export default CustomizeClassicEditor
