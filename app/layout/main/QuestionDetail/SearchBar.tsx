import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { PATH_PAGE } from "~/config/path";
const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  return (
    <div className="text-text_color flex w-full flex-row items-center gap-3 border-[1px] border-outline bg-transparent px-5 py-3 mx-3">
      <SearchIcon sx={{ width: 20 }} />
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            navigate(`${PATH_PAGE.search}?query=${value}`, {
              replace: true,
            });
          }
        }}
        onChange={(e) => setValue(e.currentTarget.value)}
        value={value}
        placeholder="Tìm kiếm"
        className="w-full bg-transparent outline-none placeholder:text-white"
      />
    </div>
  );
};

export default SearchBar;
