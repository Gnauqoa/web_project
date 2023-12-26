import React, {
  type ReactNode,
  createContext,
  useState,
  type Dispatch,
} from "react";
import { type AnswerComponentType } from "../Answer";
import useFetcher from "~/hooks/useFetcher";
// Define the ContextType
export type QuestionDetailContextType = {
  questionId: string;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  answers: AnswerComponentType[];
  loading: boolean;
  getAnswers: (questionId: string) => void;
  setAnswers: Dispatch<React.SetStateAction<AnswerComponentType[]>>;
};

// Create the initial context value
const initialContextValue: QuestionDetailContextType = {
  questionId: "",
  setQuestionId: () => {},
  answers: [],
  loading: false,
  getAnswers: () => {},
  setAnswers: () => {},
};

// Create the QuestionDetailContext
export const QuestionDetailContext =
  createContext<QuestionDetailContextType>(initialContextValue);

// Create the ContextProvider component
export const QuestionDetailContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [questionId, setQuestionId] = useState("");
  const [answers, setAnswers] = useState<AnswerComponentType[]>([]);
  const { loading, handleSubmitWithData } = useFetcher<{
    data: { items: AnswerComponentType[] };
  }>({
    method: "get",
    onSuccess: (data) => {
      if (data.submission) {
        setAnswers(data.submission?.data.items);
      }
    },
  });
  const getAnswers = (questionId: string) => {
    handleSubmitWithData({
      _action: `/resources/questions/${questionId}/answers`,
    });
  };
  return (
    <QuestionDetailContext.Provider
      value={{
        questionId,
        setQuestionId,
        answers,
        setAnswers,
        getAnswers,
        loading,
      }}
    >
      {children}
    </QuestionDetailContext.Provider>
  );
};
