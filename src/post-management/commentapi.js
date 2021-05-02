export const CreateComment = async (
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

    await fetch('http://3.15.16.150:8090/api/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    }).then((res) => { if (res.status === 201) return 0; return 1; });
};

export const GetComment = async (postId) => {
    let response = [];
    response = await fetch(`http://3.15.16.150:8090/api/comments/${postId}`)
      .then((res) => res.json());
    return response;
};

export const DeleteComment = () => {

};
