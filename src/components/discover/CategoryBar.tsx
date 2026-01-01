"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Paper, Popper, Stack } from "@mui/material";
import { ASSET_CATEGORIES_LIST } from "@/data/asset-categories";
import { CategoryInList } from "@/types";


export default function CategoryBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeSubcategory = searchParams.get("subcategory");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currCategory, setCurrCategory] = useState<CategoryInList | null>(null);

  const open = Boolean(anchorEl);

  const updateParams = (params: Record<string, string | null>) => {
    const sp = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value) sp.delete(key);
      else sp.set(key, value);
    });

    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <Box
      sx={{
        py: 1,
        // position: "relative",
        overflowX: "auto",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        {/* ALL */}
        <Button
          variant={!activeCategory ? "contained" : "text"}
          size="large"
          onClick={() => updateParams({ category: null, subcategory: null })}
          onMouseEnter={() => setAnchorEl(null)}
          sx={{ 
            borderRadius: 8, 
            px: 2, 
            textTransform: "none", 
          }}
        >
          All
        </Button>

        {ASSET_CATEGORIES_LIST.map((cat) => (
          <Button
            key={cat.id}
            size="large"
            variant={activeCategory === cat.id ? "contained" : "text"}
            sx={{
              borderRadius: 8,
              px: 2,
              textTransform: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              setAnchorEl(e.currentTarget);
              setCurrCategory(cat);
            }}
            onClick={() => updateParams({ category: cat.id, subcategory: null })}
          >
            {cat.label}
          </Button>
        ))}
      </Stack>

      {/* SUBCATEGORY POPPER */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal
        modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
        sx={{ zIndex: 1300 }}
      >
        <Paper
          onMouseLeave={() => setAnchorEl(null)}
          sx={{
            p: 1,
            borderRadius: 2,
            minWidth: 220,
            boxShadow: 4,
          }}
        >
          <Stack spacing={0.5}>
            {(currCategory?.subCategories)?.map((sub) => (
              <Button
                key={sub.id}
                fullWidth
                onClick={() => {
                  updateParams({ category: currCategory.id,  subcategory: sub.id });
                  setAnchorEl(null);
                }}
                size="large"
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: activeSubcategory === sub.id ? 600 : 400,
                  color: activeSubcategory === sub.id ? "primary.main" : "text.primary",
                }}
              >
                {sub.label}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Popper>
    </Box>
  );
}
