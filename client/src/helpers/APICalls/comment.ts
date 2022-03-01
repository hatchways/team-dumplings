import axios from 'axios';
import { CommentsApiData } from '../../interface/Comment';

export const postComment = async (blogId: string, title: string, text: string) => {
  return await axios
    .post('/comment', { blogId, title, text })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const listComments = async (blogId: string, page: number): Promise<CommentsApiData> => {
  return await axios
    .get(`/comment/${blogId}`, { params: { page } })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
