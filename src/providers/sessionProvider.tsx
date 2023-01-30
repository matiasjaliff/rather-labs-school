////////// IMPORTS //////////

// React
import { createContext, useContext, useState } from "react";

////////// DEFINITIONS //////////

const SessionContext = createContext({});

export function useSession() {
  return useContext(SessionContext);
}

////////// COMPONENT //////////

export function SessionProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [session, setSession] = useState(sessionStorage.getItem("auth"));

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
