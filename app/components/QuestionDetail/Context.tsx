import React, { type ReactNode, createContext, useState } from "react";

// Define the ContextType
type ContextType = {
  questionId: string;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
};

// Create the initial context value
const initialContextValue: ContextType = {
  questionId: "",
  setQuestionId: () => {},
};

// Create the QuestionDetailContext
export const QuestionDetailContext =
  createContext<ContextType>(initialContextValue);

// Create the ContextProvider component
export const QuestionDetailContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [questionId, setQuestionId] = useState("");

  return (
    <QuestionDetailContext.Provider value={{ questionId, setQuestionId }}>
      {children}
    </QuestionDetailContext.Provider>
  );
};
