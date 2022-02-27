import axios from 'axios';

export const postComment = async (blogId: string, title: string, text: string) => {
  return await axios
    .post('/comment', { blogId, title, text })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
