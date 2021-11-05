import { Profile } from './Profile';

export interface Sender {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  text: string;
  sender: Sender;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  members: Profile[];
  latestMessage: Message;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsApiData {
  conversation?: Conversation;
  conversations?: Conversation[];
  error?: string;
}

export interface ConversationApiData {
  conversationContent?: ConversationContent;
  error?: string;
}

export interface ConversationContent {
  conversationId?: string;
  messages?: Message[];
}

export interface MessageApiData {
  message: Message;
  error?: string;
}
