"use client";

import { Pagination, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
  mainPath: string;
}

export default function AssetsPagination({ page, totalPages, mainPath }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (_: any, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    router.push(`${mainPath}?${params.toString()}`);
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </Box>
  );
}
