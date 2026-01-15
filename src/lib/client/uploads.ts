export async function uploadWithSignedUrl(bucket: string, file: File) {
  const res = await fetch("/api/assets/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bucket,
      fileName: file.name,
      contentType: file.type,
    }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL");

  const { uploadUrl, path } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadRes.ok) throw new Error("Upload failed");

  return path;
}
