import { createContext, useContext, useState } from "react";

const SessionContext = createContext({});
const SessionUpdateContext = createContext({});

export function useSession() {
  return useContext(SessionContext);
}

export function useSessionUpdate() {
  return useContext(SessionUpdateContext);
}

export function SessionProvider({ children }: { children: JSX.Element }) {
  const [session, setSession] = useState({});

  return (
    <>
      <SessionContext.Provider value={session}>
        <SessionUpdateContext.Provider value={setSession}>
          {children}
        </SessionUpdateContext.Provider>
      </SessionContext.Provider>
    </>
  );
}
