import useStyles from './useStyles';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';

interface Props {
  style: string;
}

const AppPagination = ({ style }: Props): JSX.Element => {
  const { pagination, container, root } = useStyles();
  const paginationStyle = clsx(pagination, style);

  return (
    <>
      <Box className={container}>
        <Box className={root}>
          <Pagination />
        </Box>
      </Box>
    </>
  );
};

export default AppPagination;
