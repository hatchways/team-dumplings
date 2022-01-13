import { Profile } from './Profile';

export interface Comment {
  _id?: string;
  text: string;
  rating: number;
  profile: string;
  reviewer?: Profile;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentAndReaction {
  rating: Comment;
  like: boolean;
}

export interface CommentApiDataSuccess {
  rating?: Comment;
  ratings?: Comment[];
  commentAndReaction?: CommentAndReaction;
  error?: string;
}
