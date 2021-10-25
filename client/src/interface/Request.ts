export interface Sitter {
  _id: string;
  username: string;
}

export interface Request {
  _id: string;
  ownerId: string;
  sitterId: any;
  dogId: string;
  start: Date;
  end: Date;
  status: string;
}

export type requstStatus = 'pending' | 'declined' | 'accepted' | 'paid' | 'progress' | 'done';
export type dogGender = 'male' | 'female' | 'other';
export type dogSize = 'xs' | 's' | 'm' | 'l' | 'g';
export interface RequestProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  rate?: number;
}
export interface RequestUserAndProfile {
  _id: string;
  profile?: RequestProfile;
}
export interface SittingRequest {
  _id: string;
  status: requstStatus;
  ownerId: RequestUserAndProfile;
  sitterId: RequestUserAndProfile;
  dogId: {
    _id: string;
    ownerId: string;
    neutered: boolean;
    chipped: boolean;
    vaccinated: boolean;
    houseTrained: boolean;
    friendlyWithDogs: boolean;
    friendlyWithCats: boolean;
    friendlyWithKids: boolean;
    friendlyWithAdults: boolean;
    name: string;
    breed: string;
    size: dogSize;
    gender: dogGender;
    yearOfBirth: number;
    createdAt: Date;
    updatedAt: Date;
  };
  start: Date;
  end: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface RequestsApiData {
  updatedRequest?: Request;
  requests?: Request[] | SittingRequest[];
  error?: { message: string };
}
