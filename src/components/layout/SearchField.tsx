"use client";

import { Box, InputBase, IconButton } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";

interface SearchFieldProps {
  fullWidth?: boolean;
  setIsSearchActive?: Dispatch<SetStateAction<boolean>>;
}

export default function SearchField({
  fullWidth = false,
  setIsSearchActive,
}: SearchFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") ?? "");

  const updateUrl = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }

      router.push(`/discover?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = () => {
    updateUrl(value);
  };

  const handleClear = () => {
    setValue("");
    updateUrl("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === "Escape") {
      handleClear();
    }
  };

  useCallback(() => {
    if (!setIsSearchActive) return;

    if (value.trim()) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  }, [router, searchParams, value]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: fullWidth ? "100%" : 420,
        backgroundColor: "rgba(79,70,229,0.08)",
        border: "1px solid",
        borderColor: "rgba(79,70,229,0.25)",
        borderRadius: 2,
        px: 1,
        py: 0.5,
        transition: "background-color 0.2s, border-color 0.2s",
        "&:hover": {
          backgroundColor: "rgba(79,70,229,0.12)",
          borderColor: "rgba(79,70,229,0.35)",
        },
        "&:focus-within": {
          backgroundColor: "rgba(79,70,229,0.14)",
          borderColor: "primary.main",
        },
      }}
    >
      <InputBase
        placeholder="Search assets..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          flex: 1,
          px: 1,
          fontSize: 14,
        }}
      />

      {value && (
        <IconButton
          size="small"
          onClick={handleClear}
          aria-label="clear search"
          sx={{ px: 2, borderRadius: 1 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}

      <IconButton size="small" onClick={handleSearch} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
