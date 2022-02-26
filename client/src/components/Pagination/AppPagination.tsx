import useStyles from './useStyles';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';

interface Props {
  style?: string;
  count?: number;
  handlePageChange: (newPage: number) => void;
}

const AppPagination = ({ style, count, handlePageChange }: Props): JSX.Element => {
  const { pagination, container, root } = useStyles();
  const paginationStyle = clsx(pagination, style);

  return (
    <>
      <Box className={container}>
        <Box className={root}>
          <Pagination
            variant="outlined"
            onChange={(event, newPage) => handlePageChange(newPage)}
            className={pagination}
            count={count}
          />
        </Box>
      </Box>
    </>
  );
};

export default AppPagination;
