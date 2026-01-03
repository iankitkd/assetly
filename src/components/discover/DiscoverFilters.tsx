"use client";

import {
  Box,
  Button,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  Popover,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CurrencyRupeeIcon, SortIcon, TuneIcon, ClearAllIcon } from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import MobileFilters from "@/components/discover/MobileFilters";
import { PRICE_MAX, PRICE_MIN, sortItems } from "@/data";


export default function DiscoverFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sort = searchParams.get("sort") ?? "newest";
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const priceMin = Number(searchParams.get("priceMin") ?? PRICE_MIN);
  const priceMax = Number(searchParams.get("priceMax") ?? PRICE_MAX);

  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [priceAnchor, setPriceAnchor] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([ priceMin, priceMax ]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    router.push(`/discover?${params.toString()}`);
  };

  const clearFilters = () =>
    updateParams({
      sort: null,
      priceMin: null,
      priceMax: null,
      category: null,
      subCategory: null,
    });

  const isSortActive = sort !== "newest";
  const isPriceActive = priceMin !== PRICE_MIN || priceMax !== PRICE_MAX;
  const isCategoryActive = !!category;

  const hasActiveFilters = isSortActive || isPriceActive || isCategoryActive;

  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Discover Assets
          </Typography>
        </Box>

        {isMobile ? (
          <Button
            size="small"
            startIcon={<TuneIcon />}
            variant={hasActiveFilters ? "contained" : "outlined"}
            onClick={() => setDrawerOpen(true)}
          >
            Filters
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant={isSortActive ? "contained" : "outlined"}
              startIcon={<SortIcon />}
              onClick={(e) => setSortAnchor(e.currentTarget)}
            >
              Sort
            </Button>

            <Menu
              anchorEl={sortAnchor}
              open={Boolean(sortAnchor)}
              onClose={() => setSortAnchor(null)}
            >
              {Object.entries(sortItems).map(([_, el]) => (
                <MenuItem 
                  key={el.id} 
                  onClick={() => {updateParams({ sort: el.id }); setSortAnchor(null)}}
                >
                  {el.label}
                </MenuItem>
              ))}
            </Menu>

            <Button
              size="small"
              variant={isPriceActive ? "contained" : "outlined"}
              startIcon={<CurrencyRupeeIcon />}
              onClick={(e) => setPriceAnchor(e.currentTarget)}
            >
              Price
            </Button>
            {
              <PricePopover
                priceAnchor={priceAnchor}
                setPriceAnchor={setPriceAnchor}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                updateParams={updateParams}
              />
            }

            {hasActiveFilters && (
              <Button
                size="small"
                color="inherit"
                startIcon={<ClearAllIcon />}
                onClick={clearFilters}
              >
                Clear
              </Button>
            )}
          </Stack>
        )}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MobileFilters
          category={category}
          subcategory={subCategory}
          sort={sort}
          priceRange={priceRange}
          hasActiveFilters={hasActiveFilters}
          setPriceRange={setPriceRange}
          clearFilters={clearFilters}
          updateParams={updateParams}
          closeDrawer={() => setDrawerOpen(false)}
        />
      </Drawer>
    </Box>
  );
}

interface PricePopoverProps {
  priceAnchor: HTMLElement | null;
  setPriceAnchor: (e: HTMLAnchorElement | null) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  updateParams: (params: Record<string, string | null>) => void;
}

function PricePopover({
  priceAnchor,
  setPriceAnchor,
  priceRange,
  setPriceRange,
  updateParams,
}: PricePopoverProps) {
  return (
    <Popover
      anchorEl={priceAnchor}
      open={Boolean(priceAnchor)}
      onClose={() => setPriceAnchor(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box sx={{ p: 3, width: 260 }}>
        <Typography fontWeight={600} mb={1}>
          Price range
        </Typography>

        <Slider
          value={priceRange}
          min={PRICE_MIN}
          max={PRICE_MAX}
          onChange={(_, value) => setPriceRange(value as [number, number])}
          valueLabelDisplay="auto"
        />

        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Typography variant="caption">₹{priceRange[0]}</Typography>
          <Typography variant="caption">₹{priceRange[1]}</Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          variant="contained"
          size="small"
          onClick={() => {
            updateParams({
              priceMin: String(priceRange[0]),
              priceMax: String(priceRange[1]),
            });
            setPriceAnchor(null);
          }}
        >
          Apply
        </Button>
      </Box>
    </Popover>
  );
}
