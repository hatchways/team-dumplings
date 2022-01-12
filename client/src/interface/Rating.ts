import { Profile } from './Profile';

export interface Comment {
  _id?: string;
  text: string;
  rating: number;
  profile: string;
  reviewer?: Profile;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentApiDataSuccess {
  rating?: Comment;
  ratings?: Comment[];
  error?: string;
}
