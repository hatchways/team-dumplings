import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { Conversation, ConversationContent } from '../interface/Conversation';
import { getAllConversations } from '../helpers/APICalls/conversations';

interface IConversationContext {
  currentConversation: ConversationContent | null | undefined;
  conversations: Conversation[] | null | undefined;
  updateConversationContext: (data: Conversation[]) => void;
  updateCurrentConversation: (conversationContent: ConversationContent) => void;
}

export const ConversationContext = createContext<IConversationContext>({
  currentConversation: undefined,
  conversations: [],
  updateConversationContext: () => null,
  updateCurrentConversation: () => null,
});

export const ConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[] | null | undefined>();
  const [currentConversation, setCurrentConversation] = useState<ConversationContent | null | undefined>();

  const updateConversationContext = useCallback((data: Conversation[]) => {
    setConversations(data);
  }, []);

  const updateCurrentConversation = useCallback((conversationContent: ConversationContent) => {
    setCurrentConversation(conversationContent);
  }, []);

  useEffect(() => {
    let active = true;

    const getConversations = async () => {
      const response = await getAllConversations();
      if (response.conversations) {
        updateConversationContext(response.conversations);
      } else return;
    };
    getConversations();

    return () => {
      active = false;
    };
  }, [updateConversationContext]);

  return (
    <ConversationContext.Provider
      value={{ currentConversation, conversations, updateConversationContext, updateCurrentConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export function useConversation(): IConversationContext {
  return useContext(ConversationContext);
}
