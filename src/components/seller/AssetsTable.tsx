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

interface Asset {
  id: string;
  title: string;
  category: string;
  price: number;
  salesCount: number;
}

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
              <Chip label={asset.category} size="small" color="default" />
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
  );
}
