import axios from 'axios';
import { BlogsApiData, FetchBlogApiData } from '../../interface/Blogs';

export const listBlogs = async (page: number): Promise<BlogsApiData> => {
  return await axios
    .get('/blogs/', { params: { page } })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const fetchBlog = async (id: string): Promise<FetchBlogApiData> => {
  return await axios
    .get(`/blogs/${id}`)
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
