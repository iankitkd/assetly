"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";
import Link from "next/link";

import { Asset } from "@/types";
import { ASSET_CATEGORIES } from "@/data/asset-categories";

export default function AssetsTable({ assets }: { assets: Asset[] }) {
  return (
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
              <Chip label={ASSET_CATEGORIES[asset.category].label} size="small" color="default" />
            </TableCell>
            <TableCell>₹{asset.price}</TableCell>
            <TableCell>{asset.salesCount}</TableCell>
            <TableCell align="right">
              <Button
                component={Link}
                href={`/assets/${asset.id}`}
                size="small"
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
