export interface Blog {
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  likes: number;
  comments?: string;
}

export interface Blogs {
  blogs: [Blog];
}

export interface BlogsApiData {
  error?: { message: string };
  success?: { blogs: Blog[] | undefined };
}
