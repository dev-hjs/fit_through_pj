import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import { editorFormats, editorModules } from './editorModule';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';

Quill.register('modules/imageResize', ImageResize);

const Editor = ({ placeholder, value, ...rest }) => {
  const uploadImage = async (file, filePath) => {
    console.log(storage);
    const fileRef = ref(storage, `imgs/${filePath}`);
    console.log(file);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log(url);
    return url;
  };

  const quillRef = useRef(null);

  useEffect(() => {
    const handleImage = () => {
      const editor = quillRef.current.getEditor();
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = async () => {
        const file = input.files[0];

        // 현재 커서 위치 저장
        const range = editor.getSelection(true);

        // 서버에 올려질 때까지 표시할 로딩 placeholder 삽입
        editor.insertEmbed(range.index, 'image', `/images/loading.gif`);

        try {
          // 필자는 파이어 스토어에 저장하기 때문에 이런식으로 유틸함수를 따로 만들어줬다
          // 이런식으로 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현하면 된다
          const filePath = `contents/temp/${Date.now()}`;
          const url = await uploadImage(file, filePath);

          // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
          editor.deleteText(range.index, 1);
          // 받아온 url을 이미지 태그에 삽입
          editor.insertEmbed(range.index, 'image', url);

          // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
          editor.setSelection(range.index + 1);
        } catch (e) {
          editor.deleteText(range.index, 1);
        }
      };
    };

    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('image', handleImage);
    }
  }, []);

  return (
    // 테마 (bubble, snow, custom) https://quilljs.com/docs/themes/
    <ReactQuill
      {...rest}
      ref={quillRef}
      placeholder={placeholder}
      value={value || ''}
      theme="snow"
      modules={{
        ...editorModules,
        imageResize: {
          parchment: Quill.import('parchment'),
          modules: ['Resize', 'DisplaySize', 'Toolbar']
        }
      }}
      formats={editorFormats}
    ></ReactQuill>
  );
};

export default Editor;
