import React, { useCallback, useEffect, useState } from 'react';
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
import UserInfo from '../post-management/user';
import { DateInfo } from '../post-management/datetime';
import CommentForm from './commentform';

const useStyles = makeStyles(() => ({
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
  },
  reply: {
    // display='inline-block' right='0px' width='10%' textAlign='right'
    display: 'inline-block',
    right: '0px',
    width: '10%',
    textAlign: 'right',
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
  const { contents, tagList } = props;

  const stringSplit = contents.split(' ');

  return (
    <Grid container direction="row" spacing={1}>
      {stringSplit
        ? stringSplit.map((item) => {
            if (
              item.charAt(0) === '@'
              && tagList.includes(item.split('@')[1])
            ) {
              return (
                <Grid item>
                  <Chip
                    className="tags"
                    label={item.split('@')[1]}
                    size="small"
                    color="primary"
                  />
                </Grid>
              );
            }
            return <Box display="inline-block"> {`${item}`}&nbsp; </Box>;
          })
        : []}
    </Grid>
  );
};

const Header = (props) => {
  const { userId, imgPath } = props;
  return (
    <Box>
      <UserInfo userId={userId} imgPath={imgPath} />
    </Box>
  );
};

export const MoreComment = () => {
  const classes = useStyles();

  return <Box className={classes.more}>댓글 더 보기 . . .</Box>;
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
  } = props;
  const classes = useStyles();

  const [tagList, setTagList] = useState([]);
  const [formVisibility, setFormVisibility] = useState([]);

  useEffect(() => {
    setTagList(commentMentions);
    setFormVisibility('none');
  }, []);

  const commentStyle = CheckRoot(type);

  const RenewCommentList = useCallback(async () => {
    renewCommentList();
    setFormVisibility('none');
  });

  return (
    <Box className={classes.comment}>
      <Box marginLeft={commentStyle.marginLeft}>
        <Box display="inline-block" width="90%">
          <Header userId={writer.id} imgPath={writer.profileImgPath} />
          <Box>
            <DateInfo dateTime={writeTime} fs="11px" />
          </Box>
        </Box>

        <Box className={classes.reply} visibility={commentStyle.buttonDisplay}>
          <Box
            className={classes.icon}
            onClick={() => {
              if (formVisibility === 'none') {
                setFormVisibility('block');
              } else {
                setFormVisibility('none');
              }
            }}
          >
            <ReplyIcon color="action" />
          </Box>
        </Box>
        <Box>
          <Box display="inline-block" width="90%">
            <Content contents={contents} tagList={tagList} />
          </Box>
        </Box>
      </Box>

      <Box display={formVisibility}>
        <CommentForm
          parentCommentId={id}
          projectId={projectId}
          postId={postId}
          renewCommentList={RenewCommentList}
        />
      </Box>
    </Box>
  );
};
