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
  files.forEach(({ size }) => {
    totalSize += size / 1000;
  });
  newFiles.forEach(({ size }) => {
    totalSize += size / 1000;
  });
  return totalSize <= value;
};

module.exports = { isDuplicateData, isValidSize };
