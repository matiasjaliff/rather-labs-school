////////// IMPORTS //////////

// React
import { createContext, useContext, useState } from "react";

////////// DEFINITIONS //////////

const SelectionsContext = createContext({});
const SelectionsUpdateContext = createContext({});

export function useSelections() {
  return useContext(SelectionsContext);
}

export function useSelectionsUpdate() {
  return useContext(SelectionsUpdateContext);
}

////////// COMPONENT //////////

export function SelectionsProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});

  return (
    <>
      <SelectionsContext.Provider value={{ selectedCourse, selectedStudent }}>
        <SelectionsUpdateContext.Provider
          value={{ setSelectedCourse, setSelectedStudent }}
        >
          {children}
        </SelectionsUpdateContext.Provider>
      </SelectionsContext.Provider>
    </>
  );
}
