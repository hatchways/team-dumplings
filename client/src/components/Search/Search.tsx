import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { searchUsers } from '../../helpers/APICalls/searchUsers';
import { UserFromSearch } from '../../interface/User';
import useStyles from './useStyles';

interface Props {
  search: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>, newInputValue: string) => void;
  options: UserFromSearch[];
  setOptions: any;
  setSelected?: any;
  getSelectedUser?: any;
}

const Search = ({ search, handleChange, options, setOptions, setSelected, getSelectedUser }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const classes = useStyles();

  useEffect(() => {
    let active = true;

    const saveOptions = (users: UserFromSearch[]) => {
      setOptions(users);
    };
    async function searchAndSaveUsers() {
      setLoading(true);
      const response = await searchUsers({
        search: debouncedSearch,
      });

      if (active && response && response.users) {
        saveOptions(response.users);
      }
      setLoading(false);
    }

    searchAndSaveUsers();

    return () => {
      active = false;
    };
  }, [debouncedSearch, setOptions]);

  return (
    <form
      onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
      }}
    >
      <Autocomplete
        id="asynchronous-search"
        open={open}
        onOpen={() => {
          setOpen(true);
          setSelected(false);
        }}
        onClose={() => {
          setOpen(false);
          setSelected(true);
        }}
        getOptionSelected={(option, value) => option.username === value.username}
        getOptionLabel={(option) => `${option.profile.firstName} ${option.profile.lastName} (${option.username})`}
        options={options}
        loading={loading}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onInputChange={handleChange}
        onChange={getSelectedUser}
        inputValue={search}
        noOptionsText="No Users Found"
        freeSolo
        renderInput={(params) => (
          <div className={classes.search}>
            <InputBase
              {...params.inputProps}
              placeholder="Search"
              classes={{
                root: classes.searchRoot,
                input: classes.searchInput,
              }}
              inputProps={{
                'aria-label': 'search',
                ref: params.InputProps.ref,
              }}
              startAdornment={
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
              }
            />
          </div>
        )}
      />
    </form>
  );
};

export default Search;
