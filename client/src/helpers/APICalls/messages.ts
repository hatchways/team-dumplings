import { MessageApiData } from '../../interface/Conversation';
import { FetchOptions } from '../../interface/FetchOptions';

export async function sendMessage(conversationId: string, text: string, recipientId: string): Promise<MessageApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, text, recipientId }),
    credentials: 'include',
  };
  return await fetch(`/messages`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function updateMessageStatus(
  messageId: string,
  conversationId: string,
  recipientId: string,
): Promise<MessageApiData> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, recipientId }),
    credentials: 'include',
  };
  return await fetch(`/messages/${messageId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
