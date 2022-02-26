import axios from 'axios';
import { BlogsApiData } from '../../interface/Blogs';

export const listBlogs = async (page: number): Promise<BlogsApiData> => {
  return await axios
    .get('/blogs/', { params: { page } })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
