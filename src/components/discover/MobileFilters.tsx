"use client";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Slider,
  Button,
  Stack,
} from "@mui/material";
import { ClearAllIcon } from "@/components/icons";
import { ASSET_CATEGORIES_LIST } from "@/data/asset-categories";
import { PRICE_MAX, PRICE_MIN, sortItems } from "@/data";

interface MobileFiltersProps {
  category: string | null;
  subcategory: string | null;
  sort: string;
  priceRange: [number, number];
  hasActiveFilters: boolean;
  setPriceRange: (v: [number, number]) => void;
  updateParams: (params: Record<string, string | null>) => void;
  clearFilters: () => void;
  closeDrawer: () => void;
}

export default function MobileFilters({
  category,
  subcategory,
  sort,
  priceRange,
  hasActiveFilters,
  setPriceRange,
  updateParams,
  clearFilters,
  closeDrawer,
}: MobileFiltersProps) {
  const selectedCategory = ASSET_CATEGORIES_LIST.find((c) => c.id === category);

  return (
    <Box sx={{ p: 2 }}>
      <Typography fontWeight={700} mb={2}>
        Filters
      </Typography>

      {/* category */}
      <FormControl fullWidth size="small" sx={{mb:3}}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={category ?? ""}
          onChange={(e) =>
            updateParams({
              category: e.target.value || null,
              subcategory: null,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {ASSET_CATEGORIES_LIST.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* subcategory */}
      <FormControl fullWidth size="small" sx={{mb:3}} disabled={!category}>
        <InputLabel>SubCategory</InputLabel>
        <Select
          label="Subcategory"
          value={subcategory ?? ""}
          onChange={(e) =>
            updateParams({
              subCategory: e.target.value || null,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {selectedCategory?.subCategories?.map((sub) => (
            <MenuItem key={sub.id} value={sub.id}>
              {sub.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* sort */}
      <FormControl fullWidth size="small" sx={{mb:3}}>
        <InputLabel>Sort</InputLabel>
        <Select
          label="Sort"
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value })}
        >
          {Object.entries(sortItems).map(([_, el]) => (
            <MenuItem key={el.id} value={el.id}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* price */}
      <Box sx={{ mb: 2, px: 2, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
        <Typography fontWeight={600}>
          Price range
        </Typography>
        <Slider
          value={priceRange}
          min={PRICE_MIN}
          max={PRICE_MAX}
          onChange={(_, v) => setPriceRange(v as [number, number])}
          valueLabelDisplay="auto"
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption">₹{priceRange[0]}</Typography>
          <Typography variant="caption">₹{priceRange[1]}</Typography>
        </Stack>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 1 }}
        onClick={() => {
          updateParams({
            priceMin: String(priceRange[0]),
            priceMax: String(priceRange[1]),
          });
          closeDrawer();
        }}
      >
        Apply filters
      </Button>

      {hasActiveFilters && (
        <Button
          fullWidth
          color="inherit"
          variant="outlined"
          startIcon={<ClearAllIcon />}
          onClick={() => {
            clearFilters();
            closeDrawer();
          }}
        >
          Clear filters
        </Button>
      )}
    </Box>
  );
}
