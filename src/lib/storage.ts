"use server"

import { supabase } from "@/lib/supabase";

export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getPublicUrl = async (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

export const createSignedUrl = async (bucket: string, path: string) => {
  return await supabase.storage.from(bucket).createSignedUrl(path, 60); // 60 sec
}


export const createSignedUploadUrl = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);

  if(error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data.signedUrl;
}