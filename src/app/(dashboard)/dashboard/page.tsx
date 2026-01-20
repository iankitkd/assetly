import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import StatCard from "@/components/dashboard/StatCard";
import AssetsTable from "@/components/dashboard/AssetsTable";
import { auth } from "@/auth";
import { getMyRecentUploadedAssets, getSellerStats } from "@/actions/seller";
import {
  InventoryIcon,
  LibraryBooksIcon,
  SellIcon,
  WalletIcon,
} from "@/components/icons";
import { getMyRecentPurchasedAssets } from "@/actions/buyer";
import { getBuyerStats } from "@/actions/buyer";

export default async function page() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const [purchasedAssets, stats] = await Promise.all([
    getMyRecentPurchasedAssets(),
    getBuyerStats(),
  ]);

  let assets : any = [];
  let sellerStats = {totalSales: 0, totalAssets: 0, totalEarnings: 0};

  if(user.role === "SELLER") {
    [assets, sellerStats] = await Promise.all([
      getMyRecentUploadedAssets(),
      getSellerStats(),
    ]);
  }

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box>
        <Typography variant="h5" fontWeight={600}>
          Welcome back, {user.name ?? "there"} 👋
        </Typography>
        <Typography color="text.secondary">
          Here's an overview of your account
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={{xs: 1, md: 4}}>
        <StatCard
          title="Assets Purchased"
          value={stats.assetsOwned}
          icon={<LibraryBooksIcon />}
        />

        <StatCard
          title="Total Spent"
          value={`₹${stats.totalSpent.toFixed(2)}`}
          icon={<WalletIcon />}
        />
      </Grid>

      {/* Seller stats */}
      {user.role === "SELLER" && (
        <Box>
          <Typography variant="h6" mb={2}>
            Seller Overview
          </Typography>

          <Grid container spacing={{xs: 1, md: 4}}>
            <StatCard
              title="Total Assets"
              value={sellerStats.totalAssets}
              icon={<InventoryIcon />}
            />

            <StatCard
              title="Total Sales"
              value={sellerStats.totalSales}
              icon={<SellIcon />}
            />

            <StatCard
              title="Total Earnings"
              value={`₹${sellerStats.totalEarnings.toFixed(2)}`}
              icon={<WalletIcon />}
            />
          </Grid>
        </Box>
      )}

      {/* Recent Uploaded Assets */}
      {user.role === "SELLER" && (
        <Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Your Recent Assets</Typography>
            <Button href="/my-assets" size="small">
              View All
            </Button>
          </Box>

          <Card variant="outlined">
            <CardContent>
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
      )}

      {/* Recent purchased assets */}
      <Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="h6">Purchased Assets</Typography>
          <Button href="/library" size="small">
            View All
          </Button>
        </Box>

        <Card variant="outlined">
          <CardContent>
            {purchasedAssets.length === 0 ? (
              <Typography color="text.secondary">
                No assets purchased yet.
              </Typography>
            ) : (
              <AssetsTable assets={purchasedAssets} />
            )}
          </CardContent>
        </Card>
      </Box>

    </Stack>
  );
}
