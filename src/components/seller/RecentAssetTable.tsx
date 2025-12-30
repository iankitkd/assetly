"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";
import Link from "next/link";

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
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Sales</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={asset.category}
                      size="small"
                      color="default"
                    />
                  </TableCell>
                  <TableCell>₹{asset.price}</TableCell>
                  <TableCell>{asset.salesCount}</TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      href={`/seller/assets/${asset.id}`}
                      size="small"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
