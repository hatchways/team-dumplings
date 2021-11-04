import { NotificationReadStatus, NotificationeApiData } from '../../interface/Notification';

export const updateNotifications = async (
  inputs: NotificationReadStatus,
  id: string,
): Promise<NotificationeApiData> => {
  const fetchData = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs),
  };
  return await fetch(`/notification/${id}`, fetchData)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export const getAllNotifications = async () => {
  const fetchData = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return await fetch('/notification', fetchData)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};
