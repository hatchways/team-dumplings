import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { Rating } from '@material-ui/lab';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

export type rate = 1 | 2 | 3 | 4 | 5 | 0;

interface dayAvailabilitySchema {
  startTime: number;
  endTime: number;
}
interface Availability {
  0: [dayAvailabilitySchema];
  1: [dayAvailabilitySchema];
  2: [dayAvailabilitySchema];
  3: [dayAvailabilitySchema];
  4: [dayAvailabilitySchema];
  5: [dayAvailabilitySchema];
  6: [dayAvailabilitySchema];
}
interface Props {
  image?: string;
  fullName: string;
  rating?: rate;
  slogan?: string;
  description?: string;
  location: string;
  price: number;
  availability?: Availability;
  profileId: string;
}

const dayOfWeekAsString = (dayIndex: number): string => {
  return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][dayIndex];
};

export const ListingItem = ({
  image,
  fullName,
  rating,
  slogan,
  description,
  location,
  price,
  availability,
  profileId,
}: Props): JSX.Element => {
  const {
    itemContainer,
    largeAvatar,
    fullNameStyle,
    descriptionStyle,
    locationStyle,
    priceStyle,
    iconStyle,
    avatarButton,
    cardStyle,
    chip,
  } = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} xl={3} className={itemContainer}>
      <Card component={Box} className={cardStyle}>
        <Link component={CardActionArea} to={{ pathname: '/profile-details', search: profileId }}>
          <CardContent style={{ padding: 0 }}>
            <Box display={'flex'} flexDirection="column" alignItems="center" justifyContent="center" pt={3} pb={3}>
              <IconButton className={avatarButton}>
                <Avatar className={largeAvatar} alt="Sitter Profile Photo" src="https://i.pravatar.cc/300" />
              </IconButton>
              <Typography variant="h3" className={fullNameStyle}>
                {fullName}
              </Typography>

              <Rating name="read-only" value={rating as number} readOnly />
              <Typography className={descriptionStyle} align="center">
                {description}
              </Typography>
              <Box pt={2}>
                <Divider light />
                <Chip
                  className={chip}
                  variant={_.isEmpty(availability?.[0]) ? 'outlined' : 'default'}
                  color="primary"
                  size="small"
                  label={dayOfWeekAsString(0)}
                />
                <Chip
                  className={chip}
                  variant={_.isEmpty(availability?.[1]) ? 'outlined' : 'default'}
                  color="primary"
                  size="small"
                  label={dayOfWeekAsString(1)}
                />
                <Chip
                  className={chip}
                  variant={_.isEmpty(availability?.[2]) ? 'outlined' : 'default'}
                  color="primary"
                  size="small"
                  label={dayOfWeekAsString(2)}
                />
                <Chip
                  className={chip}
                  variant={_.isEmpty(availability?.[3]) ? 'outlined' : 'default'}
                  color="primary"
                  size="small"
                  label={dayOfWeekAsString(3)}
                />
                <Chip
                  className={chip}
                  variant={_.isEmpty(availability?.[4]) ? 'outlined' : 'default'}
                  color="primary"
                  size="small"
                  label={dayOfWeekAsString(4)}
                />
                <Chip
                  className={chip}
                  variant={_.isEmpty(availability?.[5]) ? 'outlined' : 'default'}
                  color="primary"
                  size="small"
                  label={dayOfWeekAsString(5)}
                />
                <Chip
                  className={chip}
                  variant={_.isEmpty(availability?.[6]) ? 'outlined' : 'default'}
                  color="primary"
                  size="small"
                  label={dayOfWeekAsString(6)}
                />
              </Box>
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
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};
