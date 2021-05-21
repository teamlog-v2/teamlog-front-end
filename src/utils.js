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
    totalSize += file?.size ?? 0 / 1000;
  });
  newFiles.forEach(({ size }) => {
    totalSize += size / 1000;
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
 * 확장자로 사진인지 동영상인지 판별
 * @param {String} name 파일명
 * @returns video or image
 */
const getTypeofFile = (name) => {
  const token = name.split('.');
  const extension = token[token.length - 1];
  if (extension === 'mp4') {
    return 'VIDEO';
  }
  return 'IMAGE';
};

module.exports = { isDuplicateData, isValidSize, getFormat, getTypeofFile };
