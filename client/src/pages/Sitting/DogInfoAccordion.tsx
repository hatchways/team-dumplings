import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Divider,
  Typography,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
interface dogInfo {
  name: string;
  breed: string;
  neutered: boolean;
  chipped: boolean;
  vaccinated: boolean;
  houseTrained: boolean;
  friendlyWithDogs: boolean;
  friendlyWithCats: boolean;
  friendlyWithKids: boolean;
  friendlyWithAdults: boolean;
  gender: string;
  yearOfBirth: number;
}
interface Props {
  dog: dogInfo;
}
const DogInfoAccordion = ({ dog }: Props): JSX.Element => {
  const {
    name,
    breed,
    neutered,
    chipped,
    vaccinated,
    houseTrained,
    friendlyWithDogs,
    friendlyWithCats,
    friendlyWithKids,
    friendlyWithAdults,
    gender,
    yearOfBirth,
  } = dog;
  const { heading, secondaryHeading, details, helper, link, dogChip, dogAvatar, accordionStyle } = useStyles();
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Accordion className={accordionStyle}>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls="panel1c-content" id="panel1c-header">
          <Box flexBasis="40%">
            <Typography className={heading}>
              {name}| {breed}
            </Typography>
          </Box>

          <Box flexBasis="40%">
            <Typography className={secondaryHeading}>Show more </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails className={details}>
          <Box flexBasis="40%">
            <Chip className={dogChip} label="neutered" size="small" disabled={!neutered} />
            <Chip className={dogChip} label="chipped" size="small" disabled={!chipped} />
            <Chip className={dogChip} label="vaccinated" size="small" disabled={!vaccinated} />
            <Chip className={dogChip} label="House trained" size="small" disabled={!houseTrained} />
            <Chip className={dogChip} label="Friendly with dogs" size="small" disabled={!friendlyWithDogs} />
            <Chip className={dogChip} label="Friendly with cats" size="small" disabled={!friendlyWithCats} />
            <Chip className={dogChip} label="Friendly with kids" size="small" disabled={!friendlyWithKids} />
            <Chip className={dogChip} label="Friendly with adults" size="small" disabled={!friendlyWithAdults} />
          </Box>
          <Box flexBasis="70%" className={helper}>
            <Box fontWeight="fontWeightMedium" mr={2} display="inline">
              <Avatar className={dogAvatar}>dog</Avatar>
            </Box>
            <Typography component="div">
              <Box fontWeight="fontWeightMedium" mr={2} display="inline">
                Name
              </Box>
              {name}
            </Typography>
            <Typography component="div">
              <Box mr={2} fontWeight="fontWeightMedium" display="inline">
                Breed
              </Box>
              {breed}
            </Typography>
            <Typography component="div">
              <Box fontWeight="fontWeightMedium" mr={2} display="inline">
                Gender
              </Box>
              {gender}
            </Typography>
            <Typography component="div">
              <Box fontWeight="fontWeightMedium" mr={2} display="inline">
                Birth year
              </Box>
              {yearOfBirth}
            </Typography>
            <Divider />
            <Typography variant="caption">
              Send messages directly to the owner
              <br />
              <Link to="/messenger" className={link}>
                Messenger
              </Link>
            </Typography>
          </Box>
        </AccordionDetails>
        <Divider />
      </Accordion>
    </Box>
  );
};

export default DogInfoAccordion;
