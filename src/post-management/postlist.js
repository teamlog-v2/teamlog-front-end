import {Post} from './post.js'

import React, { useState, useEffect } from 'react';

export const Postlist = () => {
    
    const [ dataList, setDataList ] = useState([]);

    useEffect(() => {
        const jsonFile = require('./datalist.json');
        // 게시물, 해시태그, 사용자 해시태그, 댓글 모두 합친 json으로 예상
        // list 안에 list?
        setDataList(jsonFile);
    }, []);

    return (
        <>
            {
                dataList ? dataList.map((item, index) => {
                    return(
                        <Post postContents = {item}/>
                    );
                }) : ''
            }
        </>
    );
}