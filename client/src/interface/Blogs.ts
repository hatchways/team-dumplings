export interface Blog {
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  likes: number;
  comments?: string;
}

export interface BlogsApiData {
  error?: { message: string };
  success?: [Blog];
}
