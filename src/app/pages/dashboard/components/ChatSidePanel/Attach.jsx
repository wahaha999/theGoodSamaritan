import React, {useEffect, useState} from 'react'
import FileUploader from './FileUploader'

function Attach({files, onLoadComplete}) {
  const [uploadedData, setUploadedData] = useState([])
  const [completedUploads, setCompletedUploads] = useState(0)
  const handleUploadComplete = (data, fileIndex) => {
    setUploadedData((prevFiles) =>
      prevFiles.map((file, index) => {
        if (index !== fileIndex) return file
        return {...file, data}
      })
    )

    setCompletedUploads((prevCount) => prevCount + 1)
  }

  useEffect(() => {
    if (completedUploads === files.length) {
      onLoadComplete(uploadedData)
    }
  }, [completedUploads])

  return (
    <>
      {files.length > 0 &&
        files.map((file, index) => (
          <FileUploader
            key={index}
            file={file}
            onUploadComplete={(data) => handleUploadComplete(data, index)}
          ></FileUploader>
        ))}
    </>
  )
}

export default Attach
