import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { type AnswerComponentType } from "../Answer";
import { type QuestionComponentType } from "../Question";
import { useOptionalUser } from "~/utils/user";

const EditContent = ({
  content,
  onClick,
}: {
  onClick: () => void;
  content: AnswerComponentType | QuestionComponentType;
}) => {
  const user = useOptionalUser();
  if (!user || (user && content.user.id !== user.id)) return <></>;
  return (
    <IconButton onClick={onClick} sx={{ p: 0 }}>
      <EditIcon sx={{ width: 20 }} />
    </IconButton>
  );
};

export default EditContent;
