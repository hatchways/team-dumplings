import axios from 'axios';
import { BlogsApiData } from '../../interface/Blogs';

export const listBlogs = async (): Promise<BlogsApiData> => {
  return await axios
    .get('/blogs/')
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
