import { React } from 'react';

const TextFile = ({ match }) => {
    const text = '번 프로젝트의 태스크가 들어갈 자리입니다.';

    return (
      <div>{match.params.id + text}</div>
    );
};

export default TextFile;
