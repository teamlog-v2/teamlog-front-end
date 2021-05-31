import ImageResize from 'image-resize';

/**
 * 데이터 중복 확인을 위한 함수
 * @param {Array} list 타겟 리스트
 * @param {any} value 검사할 데이터
 * @returns {bool} 결과
 */

const isDuplicateData = (list, value) => {
  if (list.includes(value)) {
    return true;
  }
  return false;
};

/**
 * 파일 업로드 크기 유효성 검사
 * @param {Array} files 기존 리스트
 * @param {Array} newFiels 새로운 리스트
 * @param {Array} value 한계값
 * @returns {bool} 결과
 */
const isValidSize = (files, newFiles, value) => {
  let totalSize = 0;

  files.forEach(({ file }) => {
    totalSize += (file?.size ?? 0) / 1000000;
  });
  newFiles.forEach(({ size }) => {
    totalSize += size / 1000000;
  });

  return totalSize <= value;
};

/**
 * 파일 타입을 받아 단축된 포맷 반환
 * @param {String} type 파일 객체의 type
 * @returns {String} 단축된 포맷
 */
const getFormat = (type) => {
  switch (type) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    default:
      return 'jpg';
  }
};

/**
 * 파일 속성인 contentType으로 사진인지 동영상인지 판별
 * @param {String} contentType 파일명
 * @returns video or image
 */
const getTypeofFile = (contentType) => {
  if (contentType.includes('video')) {
    return 'VIDEO';
  }
  return 'IMAGE';
};

/**
 * file객체를 입력받아 약 300kb에 맞게 압축해서 file객체로 리턴
 * @param {File} file 파일 객체
 */
const resizeImage = async (file, tempURL) => {
  const imageResize = new ImageResize();

  const { name, size, type } = file;
  const width = await new Promise((resolve, reject) => {
    const image = new Image();
    image.src = tempURL;
    image.onload = () => resolve(image.width);
    image.onerror = (error) => reject(error);
  });

  let newWidth = 0;

  if (size > 300000) {
    newWidth = Math.ceil(width * Math.sqrt(300000 / size)); // 목표: 약 300kb
  }

  const format = getFormat(type);
  let blob = null;
  if (file.size > 300000 && (format === 'jpg' || format === 'png')) {
    blob = await imageResize
      .updateOptions({
        format,
        outputType: 'blob',
        quality: 0.85,
        width: newWidth,
      })
      .play(tempURL);
  } else blob = new Blob([file]);

  const blobToFile = new File([blob], name, { type });
  return blobToFile;
};

const detectSupportFormat = async (url) => {
  const notSupportedFormat = await new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.onloadedmetadata = () => resolve(video.videoWidth === 0);
    video.onerror = (error) => reject(error);
    video.src = url;
    video.remove();
  });
  return notSupportedFormat;
};

const convertResourceUrl = (src) => {
  if (src?.indexOf?.('http://3.15.16.150:8090/resources') === 0) {
    return src.slice(src.indexOf('/resources'));
  }

  return src;
};

export {
  isDuplicateData,
  isValidSize,
  getFormat,
  getTypeofFile,
  resizeImage,
  detectSupportFormat,
  convertResourceUrl,
};
