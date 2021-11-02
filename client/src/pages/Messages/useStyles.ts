import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: '#fafafa',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    paddingTop: theme.spacing(8),
  },
  fullName: {
    fontWeight: 500,
    marginBottom: 0,
    paddingBottom: 0,
  },
  lastMessage: {
    marginTop: -4,
    paddingTop: 0,
    color: theme.palette.grey[500],
  },

  time: {
    color: theme.palette.grey[500],
  },
  badgeStyle: {
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.grey[600],
      color: 'green',
      border: '1px solid white',
      width: '8px',
      height: '8px',
    },
    '&.active': {
      '& .MuiBadge-badge': {
        backgroundColor: theme.palette.success.dark,
        color: 'green',
        border: '1px solid white',
      },
    },
  },
  activeConversation: {
    backgroundColor: theme.palette.grey[200],
  },
  ConversationBoxStyle: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  chatSideBar: {
    overflowY: 'scroll',
    height: '60vh',
  },

  chatBoxAvatar: {
    width: 53,
    height: 53,
  },
  chatBoxRecipientAvatar: {
    width: 35,
    height: 35,
  },
  chatBoxfullName: {
    fontWeight: 600,
  },
  chatBoxTypographyStyle: {
    fontWeight: 600,
  },
  chatBox: {
    overflowY: 'scroll',
  },
  sendButton: {
    padding: theme.spacing(1, 4, 1, 4),
    fontSize: 12,
    fontWeight: 450,
    borderRadius: 0,
  },
  replyArea: {
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(4),
    fontWeight: 400,
    width: '100%',
    overflowY: 'scroll',
    maxHeight: '100%',
  },
  dateStyle: {
    marginLeft: 'auto',
    paddingRight: 15,
    marginTop: 5,
    fontWeight: 500,
  },
}));

export default useStyles;
