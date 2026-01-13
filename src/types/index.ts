export type RoleType = "USER" | "SELLER";

export interface UserType {
  name: string;
  email: string;
  role: RoleType;
}

export interface Asset {
  id: string;
  title: string;
  category: string;
  price: number;
  salesCount: number;
  previewUrl: string;
}

export interface Category {
  id: string;
  label: string;
  subCategories: Record<
    string, 
    {
      id: string;
      label: string;
      description: string;
    }
  >;
}

export interface CategoryInList {
  id: string;
  label: string;
  subCategories: {
    id: string;
    label: string;
    description: string;
  }[];
}