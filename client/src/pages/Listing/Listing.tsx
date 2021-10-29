import { Box, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { CustomButton } from '../../components/Button/CustomButton';
import NavBar from '../../components/NavBar/NavBar';
import { ListingItem, rate } from './ListingItem';
import useStyles from './useStyles';

const sitters = [
  {
    id: 1,
    fullname: 'Johnny Yad',
    img: 'https://i.pravatar.cc/300',
    slogan: 'Professional dog trainer',
    description: 'I would like to work with your dog.',
    location: 'New Yourk',
    price: 80,
    rating: 5,
  },
  {
    id: 2,
    fullname: 'Johnny Yad',
    img: 'https://i.pravatar.cc/300',
    slogan: 'Professional dog trainer',
    description: 'I would like to work with your dog.',
    location: 'New Yourk',
    price: 80,
    rating: 3,
  },
  {
    id: 3,
    fullname: 'Johnny Yad',
    img: 'https://i.pravatar.cc/300',
    slogan: 'Professional dog trainer',
    description: 'I would like to work with your dog.',
    location: 'Paris',
    price: 180,
    rating: 0,
  },
  {
    id: 4,
    fullname: 'Johnny Yad',
    img: 'https://i.pravatar.cc/300',
    slogan: 'Professional dog trainer',
    description: 'I would like to work with your dog.',
    location: 'New Yourk',
    price: 40,
    rating: 4,
  },
  {
    id: 5,
    fullname: 'Johnny Yad',
    img: 'https://i.pravatar.cc/300',
    slogan: 'Professional dog trainer',
    description: 'I would like to work with your dog.',
    location: 'New Yourk',
    price: 80,
    rating: 4,
  },
  {
    id: 6,
    fullname: 'Johnny Yad',
    img: 'https://i.pravatar.cc/300',
    slogan: 'Professional dog trainer',
    description: 'I would like to work with your dog.',
    location: 'New Yourk',
    price: 80,
    rating: 4,
  },
];

const Listing = (): JSX.Element => {
  const { root, title, search, dateInOff, iconStyle } = useStyles();
  return (
    <>
      <NavBar />
      <Grid container className={root} justifyContent="space-around" alignItems="center" spacing={2}>
        <Grid container item justifyContent="space-around" alignItems="center" spacing={5}>
          <Grid item>
            <Typography variant="h2" className={title}>
              Your search results
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" alignItems="center">
            <Box display="flex">
              <TextField
                className={search}
                placeholder="Toronto, Ontario"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={iconStyle} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="dateIn"
                InputProps={{
                  disableUnderline: true,
                }}
                type="date"
                defaultValue="2022-01-01"
                className={clsx(dateInOff, 'left')}
              />
              <TextField
                id="dateOff"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="primary" aria-label="clear search filter">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type="date"
                defaultValue="2022-01-10"
                className={clsx(dateInOff, 'right')}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container item direction="row" xs={12} md={10}>
          <Grid item container spacing={1}>
            {sitters.map(({ id, img, fullname, rating, slogan, description, location, price }) => (
              <ListingItem
                key={id}
                image={img}
                fullName={fullname}
                rating={rating as rate}
                slogan={slogan}
                description={description}
                location={location}
                price={price}
              />
            ))}
          </Grid>
          <Grid item container md={12}>
            <Box width={'100%'} alignItems="center" justifyContent="center" display="flex" pt={5} pr={10} pl={10}>
              <CustomButton linkTo="#" btnText="show more" style="showmore" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Listing;
