import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import useFetcher from "~/hooks/useFetcher";
import { type UserInfoType } from "~/routes/resources.users.$userId";
import { useOptionalUser } from "~/utils/user";

const EditProfile = ({ handleCancel }: { handleCancel: () => void }) => {
  const currentUser = useOptionalUser();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    bio: currentUser?.bio || "",
  });

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const { handleSubmit, loading } = useFetcher<{ data: UserInfoType }>({
    action: `/resources/users/edit`,
    data: form,
    method: "post",
    onSuccess: () => handleCancel(),
  });
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-1">
        <input
          className="outline-none px-2 py-1 rounded-[4px] text-sm"
          name="name"
          placeholder="name"
          onChange={handleFormChange}
        />
        <input
          placeholder="bio"
          className="outline-none px-2 py-1 rounded-[4px] text-sm"
          name="bio"
          onChange={handleFormChange}
        />
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="flex flex-row gap-3">
          <div>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleSubmit}
            >
              Lưu
            </Button>
          </div>
          <div>
            <Button sx={{ textTransform: "none" }} onClick={handleCancel}>
              Hủy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
