export interface Notification {
  _id: any;
  userId: string;
  details: {
    description: string;
    text: string;
    linkTo: string;
    name: string;
    profilePhoto: string;
  };
  eventType: string;
  createdAt: Date;
}

export interface NotificationReadStatus {
  read: boolean;
}

export interface NotificationApiDataSuccess {
  notifications: Notification;
}

export interface NotificationeApiData {
  error: string;
  success: NotificationApiDataSuccess;
}
