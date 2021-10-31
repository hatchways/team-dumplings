import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import { setDefaultPaymentProfile } from '../../helpers/APICalls/payment';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  type: string;
  active: boolean;
  lastFourDigits: string;
  expDate: string;
  fullname: string;
  cardId: string;
  customerId: string;
  // eslint-disable-next-line
  defaultProfileAction: any;
}

const CreditCard = ({
  active,
  type,
  lastFourDigits,
  expDate,
  fullname,
  cardId,
  customerId,
  defaultProfileAction,
}: Props): JSX.Element => {
  const { cardBrandLogo, creditCardNumber, creditCardExpDate, creditCardHolder } = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const handleSetDefaultProfile = () => {
    setDefaultPaymentProfile(customerId, cardId).then((response) => {
      if (response.error) {
        updateSnackBarMessage(JSON.stringify(response.error));
      } else {
        defaultProfileAction();
      }
    });
  };
  return (
    <>
      <Box width={'60%'} mr={10}>
        <Card elevation={1}>
          <CardHeader
            avatar={<img src={`./assets/${type}.png`} className={cardBrandLogo} />}
            action={
              <IconButton
                aria-label="default"
                color={active ? 'primary' : 'inherit'}
                size="medium"
                onClick={handleSetDefaultProfile}
              >
                {active ? <CheckCircleRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />}
              </IconButton>
            }
          />
          <CardContent>
            <Box pl={1}>
              <Typography variant="subtitle1" className={creditCardNumber}>
                &#8226;&#8226;&#8226;&#8226; &#8226;&#8226;&#8226;&#8226; &#8226;&#8226;&#8226;&#8226; {lastFourDigits}
              </Typography>
              <Typography color="textSecondary" className={creditCardExpDate}>
                Exp. Date {expDate}
              </Typography>
              <Typography className={creditCardHolder}>{fullname}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CreditCard;
