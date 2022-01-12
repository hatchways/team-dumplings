import { Box, LinearProgress, Typography } from '@material-ui/core';

interface Props {
  // eslint-disable-next-line
  style: string;
  value: number;
  progress: number;
}

const ProgressBar = ({ style, progress, value }: Props): JSX.Element => {
  return (
    <>
      <Box flexDirection={'row'} display={'flex'} mb={1}>
        <Box pr={1}>
          <Typography>{value}</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
          <LinearProgress className={style} color="primary" variant="determinate" value={progress} />
        </Box>
      </Box>
    </>
  );
};

export default ProgressBar;
