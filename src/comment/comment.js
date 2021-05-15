import React, { useCallback, useState } from 'react';
import {
  Box,
  Chip,
  Grid,
} from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {
  makeStyles,
} from '@material-ui/core/styles';

import ReplyIcon from '@material-ui/icons/Reply';
import CloseIcon from '@material-ui/icons/Close';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { UserImage, UserId } from '../post-management/user';
import { DateInfo } from '../post-management/datetime';
import CommentForm from './commentform';
import { DeleteComment } from './commentapi';

const useStyles = makeStyles((theme) => ({
  more: {
    marginLeft: '0.25em',
    color: 'rgb(180, 180, 180)',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    cursor: 'pointer',
  },
  comment: {
    backgroundColor: 'rgb(245, 245, 245)',
    textAlign: 'left',
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  reply: {
    // display='inline-block' right='0px' width='10%' textAlign='right'
    display: 'inline-block',
    right: '0px',
    width: '40%',
    textAlign: 'right',
  },
  userInfo: {
    width: '60%',
    display: 'inline-block',
    backgroundColor: 'rgb(245, 245, 245)',
  },
  icon: {
    cursor: 'pointer',
    width: 'auto',
    display: 'inline-block',
    margin: '0.5em',
  },
  friends: {
    width: '20em',
    height: '25em',
    zIndex: '500',
    overflow: 'auto',
  },
}));

const Content = (props) => {
  const { visibility, contents, tagList } = props;

  const stringSplit = contents.split(' ');

  return (
    <Box display={visibility}>
      <Grid container direction="row" spacing={1}>
        {stringSplit
        ? stringSplit.map((string) => {
            if (
              string.charAt(0) === '@'
              && tagList.includes(string.split('@')[1])
            ) {
              return (
                <Grid item>
                  <Chip
                    className="tags"
                    label={string.split('@')[1]}
                    size="small"
                    color="primary"
                  />
                </Grid>
              );
            }
            return <Box display="inline-block"> {`${string}`}&nbsp; </Box>;
          })
        : []}
      </Grid>
    </Box>
  );
};

export const CommentCounter = (props) => {
  const { count } = props;
  return (
    <Box display="inline-block">
      <ChatBubbleOutlineIcon />
      {count}
    </Box>
  );
};

const CheckRoot = (type) => {
  if (type === 'child') {
    return {
      marginLeft: '1.5em',
      buttonDisplay: 'hidden',
    };
  }

  return {
    marginLeft: '0.5em',
    buttonDisplay: 'block',
  };
};

export const Comment = (props) => {
  const {
    id,
    projectId,
    postId,
    type,
    writeTime,
    writer,
    commentMentions,
    renewCommentList,
    contents,
    /* commentList, */
  } = props;
  const classes = useStyles();

  // const [tagList, setTagList] = useState([]);
  const [visibility, setVisibility] = useState({
    form: 'none',
    content: 'block',
  });
  const [forUpdate, setForUpdate] = useState(false);

  const commentStyle = CheckRoot(type);

  const RenewCommentList = useCallback(async () => {
    renewCommentList();
    setVisibility({
      form: 'none',
      content: 'block',
    });
  });

  return (
    <Box className={classes.comment}>
      <Box marginLeft={commentStyle.marginLeft}>
        <Box>
          <Grid container direction="row" xs={12} justify="space-between" style={{ padding: '1% 0' }}>
            <Grid item container direction="row" xs={10}>
              <Grid item>
                <UserImage imgPath={writer.profileImgPath} />
              </Grid>
              <Grid item container direction="column" xs={2}>
                <UserId userId={writer.id} />
                <DateInfo dateTime={writeTime} />
              </Grid>
            </Grid>
            <Grid item visibility={commentStyle.buttonDisplay}>
              <Box
                visibility={commentStyle.buttonDisplay}
                className={classes.icon}
                onClick={() => {
                  setForUpdate(false);
                  if (visibility.form === 'none') {
                    setVisibility({
                      form: 'block',
                      content: 'block', // 대댓글 -> 수정 전환 대비
                    });
                  } else if (visibility.form === 'block' && visibility.content === 'none') {
                    setVisibility({
                      form: 'block',
                      content: 'block',
                    });
                  } else {
                    setVisibility({
                      form: 'none',
                      content: 'block',
                    });
                  }
                }}
              >
                <ReplyIcon color="action" fontSize="small" />
              </Box>
              <Box
                className={classes.icon}
                onClick={async () => {
                  if (visibility.content === 'block') {
                    setForUpdate(true);
                    setVisibility({
                      form: 'block',
                      content: 'none',
                    });
                  } else {
                    setForUpdate(false);
                    setVisibility({
                      form: 'none',
                      content: 'block',
                    });
                  }
                }}
              >
                <BorderColorIcon color="action" fontSize="small" />
              </Box>
              <Box
                className={classes.icon}
                onClick={async () => {
                  if (window.confirm('정말로 삭제하시겠습니까?')) {
                    const status = await DeleteComment(id);
                    if (status === 200) {
                        renewCommentList();
                    }
                  }
                }}
              >
                <CloseIcon color="action" fontSize="small" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid item style={{ padding: '1%' }}>
            <Content
              visibility={visibility.content}
              contents={contents}
              tagList={commentMentions}
            />
          </Grid>
        </Box>
      </Box>
      <Box display={visibility.form}>
        <CommentForm
          id={id}
          projectId={projectId}
          postId={postId}
          renewCommentList={RenewCommentList}
          contents={contents}
          forUpdate={forUpdate}
        />
      </Box>
    </Box>
  );
};
