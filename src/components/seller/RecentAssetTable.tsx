"use client";

import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import AssetsTable from "@/components/seller/AssetsTable";

interface Asset {
  id: string;
  title: string;
  category: string;
  price: number;
  salesCount: number;
}

export default function RecentAssetsTable({ assets }: { assets: Asset[] }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontWeight={600}>Recent Assets</Typography>
          <Button component={Link} href="/seller/assets" size="small">
            View All
          </Button>
        </Box>

        {assets.length === 0 ? (
          <Typography color="text.secondary">
            No assets uploaded yet.
          </Typography>
        ) : (
          <AssetsTable assets={assets} />
        )}
      </CardContent>
    </Card>
  );
}
