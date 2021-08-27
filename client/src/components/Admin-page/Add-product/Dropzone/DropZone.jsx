import React, { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import './DropZone.styles.scss';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#e0e0e0',
  borderStyle: 'dashed',
  backgroundColor: '#f3f3f3',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const DropZone = ({ error, files, setFiles }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      var fileArr = [];

      acceptedFiles.map((file) =>
        fileArr.push(
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );

      setFiles(fileArr);
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <section className='dropzone container'>
      <div {...getRootProps({ className: 'dropzone', style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {error ? (
        <div
          style={{ fontSize: '14px', marginTop: '7px' }}
          className='error file-error-msg'>
          <p>Please add image(s)</p>
        </div>
      ) : (
        ''
      )}
      <aside className='thumbsContainer'>
        {files.map((file, i) => (
          <div className='thumb' key={file.name}>
            <div className='thumbInner'>
              <img src={file.preview} className='thumb-img' alt='' />
            </div>
            <span
              style={{ color: '#fff' }}
              onClick={() => {
                const newFiless = files.filter((f) => f.name !== file.name);
                setFiles(newFiless);
              }}
              className='rmFile'>
              &#10005;
            </span>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default DropZone;
