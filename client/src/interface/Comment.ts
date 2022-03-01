export interface Comment {
  blodId?: string;
  title: string;
  text: string;
}

export interface CommentApiDataSuccess {
  comments: Comment[];
  numberOfPages: number;
}

export interface CommentsApiData {
  error?: { message: string };
  success?: CommentApiDataSuccess;
}
