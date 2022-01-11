import { FetchOptions } from '../../interface/FetchOptions';
import { Comment, CommentApiDataSuccess } from '../../interface/Review';

export const createComment = async (comment: Comment): Promise<CommentApiDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
    credentials: 'include',
  };
  return await fetch(`/comments/`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export async function listComments(profileId: string): Promise<CommentApiDataSuccess> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/comments/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
