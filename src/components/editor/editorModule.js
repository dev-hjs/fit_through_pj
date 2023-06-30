import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);
// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const toolbarOptions = [
  ['link', 'image', 'video'],
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }]
];

// 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
export const editorFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'link',
  'image',
  'video',
  'width'
];

export const editorModules = {
  toolbar: {
    container: toolbarOptions
  },
  imageResize: {
    // https://www.npmjs.com/package/quill-image-resize-module-react 참고
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar']
  }
};
