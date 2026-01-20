import { Box, Grid, Typography } from "@mui/material";
import LibraryAssetCard from "@/components/dashboard/LibraryAssetCard";
import AssetsPagination from "@/components/shared/AssetsPagination";
import { redirect } from "next/navigation";
import { getMyLibrary } from "@/actions/buyer";

type SearchParams = Promise<{[key: string] : string}>;

export default async function LibraryPage(props : {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;
  let page = Math.max(1, Number(searchParams.page) || 1);

  const {purchases, totalPages} = await getMyLibrary(page);

  if(totalPages > 0 && page > totalPages) {
    redirect(`/library?page=${totalPages}`);
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={4}>
        Your Library
      </Typography>

      {purchases.length === 0 ? (
        <Box>
          <Typography variant="h6">
            Your library is empty
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Purchase assets to access them here.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {purchases.map((purchase) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={purchase.id}>
              <LibraryAssetCard
                asset={{
                  id: purchase.asset.id,
                  title: purchase.asset.title,
                  category: purchase.asset.category,
                  price: purchase.asset.price,
                  thumbnail: purchase.asset.previewUrl,
                  createdAt: purchase.asset.createdAt,
                }}
                purchasedAt={purchase.createdAt}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <AssetsPagination page={page} totalPages={totalPages} mainPath="/library" />
      )}
    </Box>
  );
}
