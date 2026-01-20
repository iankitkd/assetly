import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import {AddIcon} from "@/components/icons";
import { getMyAssets } from "@/actions/seller";
import AssetsTable from "@/components/dashboard/AssetsTable";
import AssetsPagination from "@/components/shared/AssetsPagination";
import { redirect } from "next/navigation";
import Link from "next/link";


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function SellerAssetsPage(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;
  let page = Math.max(1, Number(searchParams.page) || 1);

  const { assets, totalPages } = await getMyAssets(page);

  if(totalPages > 0 && page > totalPages) {
    redirect(`/my-assets?page=${totalPages}`);
  }

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          My Assets
        </Typography>

        <Button
          href="/my-assets/new"
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
        >
          Upload Asset
        </Button>
      </Box>

      {/* Table */}
      {(assets.length === 0) ? (
        <Card variant="outlined">
          <CardContent>
            <Typography fontWeight={600}>No assets yet</Typography>
            <Typography color="text.secondary" mb={2}>
              Upload your first asset to start selling.
            </Typography>
            <Button component={Link} href="/my-assets/new" variant="contained">
              Upload Asset
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card variant="outlined">
          <CardContent>
            <AssetsTable assets={assets} />
          </CardContent>
        </Card>
      )}


      {/* Pagination */}
      {totalPages > 1 && (
        <AssetsPagination page={page} totalPages={totalPages} mainPath="/my-assets" />
      )}
    </Box>
  );
}
