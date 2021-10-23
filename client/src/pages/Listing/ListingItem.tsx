import { Avatar, Box, Divider, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import useStyles from './useStyles';
import RoomIcon from '@material-ui/icons/Room';

export type rate = 1 | 2 | 3 | 4 | 5 | 0;

interface Props {
  image?: string;
  fullName: string;
  rating?: rate;
  slogan?: string;
  description?: string;
  location: string;
  price: number;
}

export const ListingItem = ({ image, fullName, rating, slogan, description, location, price }: Props): JSX.Element => {
  const {
    itemContainer,
    largeAvatar,
    fullNameStyle,
    descriptionStyle,
    locationStyle,
    priceStyle,
    iconStyle,
    avatarButton,
  } = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} xl={3} style={{ display: 'flex' }}>
      <Box
        className={itemContainer}
        component={Paper}
        width={300}
        height={366}
        m={2}
        flex={10}
        display={'flex'}
        flexDirection="column"
        alignContent="space-between"
      >
        <Box display={'flex'} flexDirection="column" alignItems="center" justifyContent="center" pt={3} pb={3}>
          <IconButton className={avatarButton}>
            <Avatar
              className={largeAvatar}
              alt="Marketplace for Dog Sitters, Dog Owners"
              src="https://i.pravatar.cc/300"
            />
          </IconButton>
          <Typography variant="h3" className={fullNameStyle}>
            {fullName}
          </Typography>
          <Typography variant="subtitle1">{slogan}</Typography>
          <Rating name="read-only" value={rating as number} readOnly />
          <Typography className={descriptionStyle} align="center">
            {description}
          </Typography>
        </Box>
        <Divider light />
        <Box flex={2} display={'flex'} alignContent="space-between" pt={2} pb={2} pl={4} pr={4}>
          <Box flex={10} display="flex">
            <RoomIcon className={iconStyle} />
            <Typography className={locationStyle}>{location}</Typography>
          </Box>
          <Box flex={2}>
            <Typography className={priceStyle}>${price}/hr</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
