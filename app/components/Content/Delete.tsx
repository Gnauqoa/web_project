import { CircularProgress, IconButton } from "@mui/material";
import { useOptionalUser } from "~/utils/user";
import DeleteIcon from "@mui/icons-material/Delete";
import useToggle from "~/hooks/useToggle";
import ConfirmModal from "../ConfirmModal";
import useFetcher from "~/hooks/useFetcher";
import { type ContentProps } from ".";

const Delete = ({
  content,
  type,
  onSuccess,
}: ContentProps & { onSuccess: () => void }) => {
  const { toggle, handleOpen, handleClose } = useToggle({});
  const user = useOptionalUser();
  const { loading, handleSubmit } = useFetcher<any>({
    action: `/resources/${type}/${content.id}/delete`,
    onSuccess: onSuccess,
    method: "post",
  });
  if (!user || (user && content.user.id !== user.id)) return <></>;
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <DeleteIcon sx={{ width: 20 }} />
        </IconButton>
      )}

      <ConfirmModal
        title={"Bạn có chắc chắn muốn xóa"}
        open={toggle}
        onClose={handleClose}
        onConfirm={() => {
          handleSubmit();
          handleClose();
        }}
      />
    </>
  );
};

export default Delete;
