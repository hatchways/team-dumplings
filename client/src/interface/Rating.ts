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
export interface ReviewStats {
  sumRating: string;
  sum1Ratings: number;
  sum2Ratings: number;
  sum3Ratings: number;
  sum4Ratings: number;
  sum5Ratings: number;
  total: number;
}
export interface CommentApiDataSuccess {
  rating?: Comment;
  ratings?: Comment[];
  stats?: ReviewStats;
  error?: string;
}
