"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {CloudUploadIcon} from "@/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ASSET_CATEGORIES_LIST } from "@/data/asset-categories";
import { assetSchema, AssetValues } from "@/lib/validators";
import { uploadAsset } from "@/actions/uploadAsset";
import AlertSnackbar from "@/components/shared/AlertSnackbar";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{success: boolean, message: string}>();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AssetValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      title: "",
      description: "",
      // price: 0,
      mainCategory: "",
      subCategory: "",
    },
  });

  const mainCategory = watch("mainCategory");
  const previewName = watch("preview")?.[0]?.name;
  const assetFileName = watch("assetFile")?.[0]?.name;

  const selectedCategory = useMemo(
    () => ASSET_CATEGORIES_LIST.find((c) => c.id === mainCategory),
    [mainCategory]
  );


  const onSubmit = async (values: AssetValues) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof FileList) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, String(value));
        }
      });
      
      const res = await uploadAsset(formData);
      setStatus({success: res.success, message: res.message});
      setOpen(true);
      reset({title: "", description: "", price: 0, mainCategory: "", subCategory: "", preview: undefined, assetFile: undefined});
      router.push("/my-assets");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card sx={{ maxWidth: 760, mx: "auto", borderRadius: 3 }}>
      <CardHeader
        title={<Typography fontWeight={600} variant="h5">Upload New Asset</Typography>}
        subheader="Add a digital product to sell on Assetly"
      />
      <Divider />

      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Asset Title"
              placeholder="Modern UI Kit, Icon Pack, Dashboard Template"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title")}
            />

            <TextField
              label="Description"
              placeholder="Describe what your asset includes, use cases, and formats"
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />

            <TextField
              label="Price (Rs)"
              type="number"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />

            {/* categories */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Category"
                fullWidth
                error={!!errors.mainCategory}
                helperText={errors.mainCategory?.message}
                {...register("mainCategory")}
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {ASSET_CATEGORIES_LIST.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Subcategory"
                fullWidth
                disabled={!selectedCategory}
                error={!!errors.subCategory}
                helperText={errors.subCategory?.message}
                {...register("subCategory")}
              >
                <MenuItem value="" disabled>
                  Select a subcategory
                </MenuItem>
                {selectedCategory?.subCategories.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* preview image upload */}
            <Box>
              <Typography fontWeight={600} mb={1}>
                Preview Image
              </Typography>

              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<CloudUploadIcon />}
                size="small"
                sx={{ py: 2, borderStyle: "dashed", borderRadius: 2, }}
              >
                {previewName ?? "Upload Preview Image (JPG, PNG)"}
                <input hidden type="file" accept="image/*" {...register("preview")} />
              </Button>

              <Typography variant="caption" color={errors.preview ? "error": "text.secondary"}>
                {errors.preview 
                  ? errors.preview.message as String
                  : "JPG or PNG • Recommended size: 1200x800 px"
                }
              </Typography>

              {/* Image Preview */}
              {previewName && (
                <Box
                  mt={2}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    maxWidth: 320,
                  }}
                >
                  <img
                    src={URL.createObjectURL(watch("preview")[0])}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src) }
                  />
                </Box>
              )}
            </Box>

            {/* asset file upload */}
            <Box>
              <Typography fontWeight={600} mb={1}>
                Asset File
              </Typography>

              <Button
                component="label"
                variant="outlined"
                fullWidth
                size="small"
                startIcon={<CloudUploadIcon />}
                sx={{ py: 2, borderStyle: "dashed", borderRadius: 2,}}
              >
                {assetFileName ?? "Upload Asset File (ZIP, PDF)"}
                <input hidden type="file" accept=".zip,.pdf" {...register('assetFile')} />
              </Button>

              <Typography variant="caption" color="error">
                {errors.assetFile?.message as String}
              </Typography>
            </Box>

            {/* submit button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Publish Asset"}
            </Button>
            
          </Stack>
        </Box>
      </CardContent>

      <AlertSnackbar
        open={open}
        setOpen={setOpen}
        success={status?.success}
        message={status?.message}
      />
    </Card>
  );
}
