export const CreateComment = (
    parentCommentIdVal,
    writerIdVal,
    postIdVal,
    contentsVal,
    commentMentionsVal,
    ) => {
const comment = {
    parentCommentId: parentCommentIdVal,
    writerId: writerIdVal, // 이미 알고있어야 하는 아이디
    postId: postIdVal,
    contents: contentsVal,
    commentMentions: commentMentionsVal, // 여기에 이제 해시태그...
    };

    fetch('http://3.15.16.150:8090/api/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    }).then((res) => alert(res.status));
};

export const GetComment = () => {

};

export const DeleteComment = () => {

};
