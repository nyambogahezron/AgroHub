import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import axios from 'axios';

type GlobalContextProps = {
  User: any;
  setUser: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  LoginUser: (data: any) => void;
  session: any;
  setSession: Dispatch<SetStateAction<any>>;
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextProps>({
  User: null,
  setUser: () => {},
  isLoading: false,
  LoginUser: () => {},
  session: null,
  setSession: () => {},
  userEmail: '',
  setUserEmail: () => {},
});

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [User, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState();
  const [userEmail, setUserEmail] = useState('');
  console.log('user email',userEmail);
  

  async function LoginUser(data) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
        console.log(response.data.msg);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        User,
        setUser,
        isLoading,
        LoginUser,
        session,
        setSession,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
