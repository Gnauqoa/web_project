import { IconButton } from "@mui/material";
import { useState } from "react";
import { useCopyToClipboard } from "~/hooks/useCopyToClipboard";
import LinkIcon from "@mui/icons-material/Link";
import { type ContentProps } from ".";

const Copy = ({ content, type }: ContentProps) => {
  const [copied, setCopied] = useState<boolean>();
  const [, copy] = useCopyToClipboard();
  return (
    <IconButton
      sx={{ p: 0 }}
      onClick={() => {
        copy(`${window.location.origin}/${type}/${content.id}`);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      <LinkIcon color={copied ? "primary" : "inherit"} sx={{ width: 20 }} />
    </IconButton>
  );
};

export default Copy;
