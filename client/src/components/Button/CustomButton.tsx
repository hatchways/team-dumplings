import { Badge, Button } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  // eslint-disable-next-line
  linkTo: any;
  btnText: string;
  style?: string;
  status?: string;
  disable?: boolean;
  cssStyle?: React.CSSProperties;
  // eslint-disable-next-line
  onClickFunction?: any;
}

const CustomButton = ({ linkTo, btnText, style, status, disable, cssStyle, onClickFunction }: Props): JSX.Element => {
  const { button, badge } = useStyles();
  const buttonStyle = clsx(button, style);
  const badgeStyle = clsx(badge, status);

  return (
    <Button
      component={Link}
      to={linkTo}
      variant={'contained'}
      disableElevation
      className={buttonStyle}
      disableRipple
      disabled={disable}
      style={cssStyle}
      onClick={onClickFunction}
    >
      <Badge classes={{ badge: badgeStyle }} variant="dot">
        {btnText}
      </Badge>
    </Button>
  );
};

export { CustomButton };
