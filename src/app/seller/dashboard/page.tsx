import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import StatsCard from "@/components/seller/StatsCard";
import AssetsTable from "@/components/seller/AssetsTable";
import { auth } from "@/auth";
import { getRecentAssetsBySeller } from "@/actions/seller";

export default async function page() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const assets = await getRecentAssetsBySeller(session.user.id);

  const totalAssets = 26;
  const totalSales = 12;
  const earnings = 420;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Overview
      </Typography>

      {/* Stats */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{xs: 12, sm: 6, md: 4 }}>
          <StatsCard title="Total Assets" value={totalAssets} />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 4 }}>
          <StatsCard title="Total Sales" value={totalSales} />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 4 }}>
          <StatsCard title="Earnings" value={`₹${earnings}`} />
        </Grid>
      </Grid>

      {/* Recent Assets */}
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontWeight={600}>Recent Assets</Typography>
            <Button href="/seller/assets" size="small">
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
    </Box>
  );
}
