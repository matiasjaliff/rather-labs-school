////////// IMPORTS //////////

// React
import { createContext, useContext, useState } from "react";

////////// DEFINITIONS //////////

const SessionContext = createContext({});
const SessionUpdateContext = createContext({});

export function useSession() {
  return useContext(SessionContext);
}

export function useSessionUpdate() {
  return useContext(SessionUpdateContext);
}

////////// COMPONENT //////////

export function SessionProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [session, setSession] = useState(sessionStorage.getItem("auth"));

  return (
    <SessionContext.Provider value={{ session }}>
      <SessionUpdateContext.Provider value={setSession}>
        {children}
      </SessionUpdateContext.Provider>
    </SessionContext.Provider>
  );
}
