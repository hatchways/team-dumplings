import { Link } from 'react-router-dom';
import { Badge, Button } from '@material-ui/core';
import useStyles from './useStyles';
import clsx from 'clsx';

interface Props {
  linkTo: string;
  btnText: string;
  style?: string;
  status?: string;
  disable?: boolean;
  cssStyle?: React.CSSProperties;
}

const CustomButton = ({ linkTo, btnText, style, status, disable, cssStyle }: Props): JSX.Element => {
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
    >
      <Badge classes={{ badge: badgeStyle }} variant="dot">
        {btnText}
      </Badge>
    </Button>
  );
};

export { CustomButton };