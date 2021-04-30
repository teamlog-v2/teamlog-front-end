import { React, useEffect } from 'react';

const TextFile = ({ match }) => {
    const text = 'TextFile';

        useEffect(() => {
        }, []);

    console.log('test');
    return (
      <div>{match.params.id + text}</div>
    );
};

export default TextFile;
