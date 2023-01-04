import React, { useContext, useState } from "react";

import type { CourseType, StudentType } from "../config/types";

const SelectionsContext = React.createContext();
const SelectionsUpdateContext = React.createContext();

export function useSelections() {
  return useContext(SelectionsContext);
}

export function useSelectionsUpdate() {
  return useContext(SelectionsUpdateContext);
}

export function SelectionsProvider({ children }: { children: JSX.Element }) {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});

  function handleCourseSelection(course: CourseType) {
    setSelectedCourse(course);
  }

  function handleStudentSelection(student: StudentType) {
    setSelectedStudent(student);
  }

  console.log("Provider ok");
  return (
    <>
      <SelectionsContext.Provider value={{ selectedCourse, selectedStudent }}>
        <SelectionsUpdateContext.Provider
          value={{ handleCourseSelection, handleStudentSelection }}
        >
          {children}
        </SelectionsUpdateContext.Provider>
      </SelectionsContext.Provider>
    </>
  );
}
