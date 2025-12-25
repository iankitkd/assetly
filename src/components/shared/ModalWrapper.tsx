"use client";

import { Modal, Backdrop, Box } from "@mui/material";
import { useRouter } from "next/navigation";

interface ModalWrapperProps {
  children: React.ReactNode;
}

export default function ModalWrapper({ children }: ModalWrapperProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // go back to previous page
  };

  return (
    <Modal
      open
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
