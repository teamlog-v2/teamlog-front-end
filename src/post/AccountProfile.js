import { Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { convertResourceUrl } from '../utils';

const useStyles = makeStyles(() => ({
  account: {
    cursor: 'pointer',
  },
  image: {
    backgroundColor: 'black',
  },
  small: {
    width: '35px',
    height: '35px',
  },
}));

const AccountImage = (props) => {
  const classes = useStyles();

  const { imgPath = '' } = props;

  return <Avatar className={classes.small} src={imgPath ? convertResourceUrl(imgPath) : ''} />;
};

const AccountId = (props) => {
  const { accountId, fontSize } = props;

  return (
    <Box display="inline-block" fontSize={fontSize}>
      <Link
        to={`/accounts/${accountId}`}
        style={{ textDecoration: 'none' }}
      >
        <strong style={{ marginRight: '0.25em' }}>{accountId}</strong>
      </Link>
    </Box>
  );
};

export { AccountId, AccountImage };

