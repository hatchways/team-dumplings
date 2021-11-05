import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation, ConversationContent } from '../interface/Conversation';
import { getAllConversations } from '../helpers/APICalls/conversations';
import { boolean } from 'yup';

interface IConversationContext {
  currentConversation: ConversationContent | null | undefined;
  conversations: Conversation[] | null | undefined;
  updateConversationContext: (data: Conversation[]) => void;
  updateCurrentConversation: (conversationContent: ConversationContent) => void;
  loading: boolean | null;
}

export const ConversationContext = createContext<IConversationContext>({
  currentConversation: undefined,
  conversations: [],
  updateConversationContext: () => null,
  updateCurrentConversation: () => null,
  loading: null,
});

export const ConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[] | null | undefined>();
  const [currentConversation, setCurrentConversation] = useState<ConversationContent | null | undefined>();
  const [loading, setLoading] = useState<boolean | null>(null);

  const updateConversationContext = useCallback((data: Conversation[]) => {
    setConversations(data);
  }, []);

  const updateCurrentConversation = useCallback((conversationContent: ConversationContent) => {
    setCurrentConversation(conversationContent);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const getConversations = async () => {
      const response = await getAllConversations();
      if (response.conversations) {
        updateConversationContext(response.conversations);
      } else return;
    };
    getConversations();
    setLoading(false);
    return () => {
      active = false;
    };
  }, [updateConversationContext]);

  return (
    <ConversationContext.Provider
      value={{ currentConversation, conversations, updateConversationContext, updateCurrentConversation, loading }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export function useConversation(): IConversationContext {
  return useContext(ConversationContext);
}
