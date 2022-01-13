import { FetchOptions } from '../../interface/FetchOptions';
import { Comment, CommentApiDataSuccess } from '../../interface/Rating';

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

export const isLikedComment = async (commentId: string): Promise<CommentApiDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/comments/like/${commentId}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export const likeComment = async (commentId: string, val: number): Promise<CommentApiDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commentId, val }),
    credentials: 'include',
  };
  return await fetch(`/comments/like`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export async function listComments(profileId: string, limit: number, skip: number): Promise<CommentApiDataSuccess> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ limit, skip }),
  };
  return await fetch(`/comments/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
