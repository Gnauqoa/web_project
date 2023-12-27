import { Button } from "@mui/material";
import Modal from "../Modal";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Bạn có chắc chắn muốn xóa câu hỏi này?",
  cancelText = "Không",
  confirmText = "Chắc chắn",
}: {
  title?: string;
  cancelText?: string;
  confirmText?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-2 bg-white py-3 px-3 rounded">
        <p className="text-lg text-[#000]">{title}</p>
        <div className="ml-auto flex flex-row items-center gap-2 px-2 py-2">
          <Button
            sx={{ textTransform: "none" }}
            type="button"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            onClick={onConfirm}
            type="button"
            variant="contained"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
