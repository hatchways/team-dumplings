export interface Blog {
  _id?: string;
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  likes: number;
  comments?: string;
  numberOfPages?: number;
}

export interface Blogs {
  blogs: [Blog];
}

export interface BlogsApiData {
  error?: { message: string };
  success?: {
    blogs: Blog[] | undefined;
    numberOfPages: number;
  };
}

export interface FetchBlogApiData {
  error?: { message: string };
  success?: { blog: Blog };
}
