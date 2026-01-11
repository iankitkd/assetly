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
import AssetsTable from "@/components/seller/AssetsTable";
import { auth } from "@/auth";
import { getRecentAssetsBySeller } from "@/actions/seller";
import {
  InventoryIcon,
  LibraryBooksIcon,
  SellIcon,
  WalletIcon,
} from "@/components/icons";
import { getRecentPurchasedAssets } from "@/actions/asset";

export default async function page() {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = session.user;
  const assets = await getRecentAssetsBySeller(userId);
  const purchasedAssets = await getRecentPurchasedAssets(userId);

  const stats = { purchasedCount: 103, totalSpent: 10409 };
  const sellerStats = { totalAssets: 26, totalSales: 12, totalEarnings: 420 };

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
      <Grid container spacing={3}>
        <StatCard
          title="Assets Purchased"
          value={stats.purchasedCount}
          icon={<LibraryBooksIcon />}
        />

        <StatCard
          title="Total Spent"
          value={`₹${stats.totalSpent.toFixed(2)}`}
          icon={<WalletIcon />}
        />
      </Grid>

      {user.role === "SELLER" && (
        <Box>
          <Typography variant="h6" mb={2}>
            Seller Overview
          </Typography>

          <Grid container spacing={3}>
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
            <Button href="/assets" size="small">
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
