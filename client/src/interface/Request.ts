export interface Sitter {
  _id: string;
  username: string;
}

export interface Request {
  _id: string;
  ownerId: string;
  sitterId: { _id: string; username: string };
  dogId: string;
  start: Date;
  end: Date;
  status: string;
}

export interface RequestsApiData {
  requests?: Request[];
  error?: { message: string };
}
