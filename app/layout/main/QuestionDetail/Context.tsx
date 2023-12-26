import React, {
  type ReactNode,
  createContext,
  useState,
  type Dispatch,
} from "react";
import { type AnswerComponentType } from "../Answer";
import useFetcher from "~/hooks/useFetcher";
import useToggle from "~/hooks/useToggle";
// Define the ContextType
export type QuestionDetailContextType = {
  questionId: string;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  answers: AnswerComponentType[];
  loading: boolean;
  getAnswers: (questionId: string) => void;
  setAnswers: Dispatch<React.SetStateAction<AnswerComponentType[]>>;
  handleClose: () => void;
  open: boolean;
};

// Create the initial context value
const initialContextValue: QuestionDetailContextType = {
  questionId: "",
  setQuestionId: () => {},
  answers: [],
  loading: false,
  getAnswers: () => {},
  setAnswers: () => {},
  open: false,
  handleClose: () => {},
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
  const { toggle: open, handleOpen, handleClose } = useToggle({});
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
    handleOpen();
    setQuestionId(questionId);
    handleSubmitWithData({
      _action: `/resources/questions/${questionId}/answers`,
    });
  };
  return (
    <QuestionDetailContext.Provider
      value={{
        questionId,
        handleClose,
        open,
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
