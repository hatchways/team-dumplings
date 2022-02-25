import axios from 'axios';

export const listBlogs = async () => {
  return await axios
    .get('/blogs/')
    .then((res: { data: any; }) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
