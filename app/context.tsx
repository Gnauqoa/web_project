import { type ReactNode } from "react";
import { QuestionDetailContextProvider } from "./components/QuestionDetail/Context";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QuestionDetailContextProvider>{children}</QuestionDetailContextProvider>
  );
};

export default ContextProvider;
