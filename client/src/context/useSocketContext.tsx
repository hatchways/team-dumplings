import { useState, useContext, createContext, FunctionComponent, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuthContext';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { loggedInUser } = useAuth();

  const initSocket = useCallback(() => {
    setSocket(
      io('/', {
        withCredentials: true,
      }),
    );
  }, []);

  useEffect(() => {
    if (socket && loggedInUser) {
      socket.emit('addUser', loggedInUser.profile);
    }
  }, [socket, loggedInUser]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  return <SocketContext.Provider value={{ socket, initSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
