import { Category, CategoryInList } from "@/types";

export const ASSET_CATEGORIES: Record<string, Category> = {
  design: {
    id: "design",
    label: "Design",
    subCategories: {
      "ui-kits": {
        id: "ui-kits",
        label: "UI Kits",
        description: "Design systems, components, layouts",
      },
      icons: {
        id: "icons",
        label: "Icons",
        description: "SVG icons, icon packs",
      },
      illustrations: {
        id: "illustrations",
        label: "Illustrations",
        description: "2D, 3D, and vector illustrations",
      },
      mockups: {
        id: "mockups",
        label: "Mockups",
        description: "Device and scene mockups",
      },
      graphics: {
        id: "graphics",
        label: "Graphics",
        description: "Banners, patterns, backgrounds",
      },
      "brand-kits": {
        id: "brand-kits",
        label: "Brand Kits",
        description: "Brand identity assets",
      },
      fonts: {
        id: "fonts",
        label: "Fonts",
        description: "Display and text fonts",
      },
    },
  },

  code: {
    id: "code",
    label: "Code",
    subCategories: {
      templates: {
        id: "templates",
        label: "Templates",
        description: "Landing pages, dashboards, websites",
      },
      "ui-components": {
        id: "ui-components",
        label: "UI Components",
        description: "Reusable frontend components",
      },
      "code-snippets": {
        id: "code-snippets",
        label: "Code Snippets",
        description: "Small reusable code blocks",
      },
      themes: {
        id: "themes",
        label: "Themes",
        description: "Website and app themes",
      },
      plugins: {
        id: "plugins",
        label: "Plugins",
        description: "Extensions and add-ons",
      },
    },
  },

  media: {
    id: "media",
    label: "Media",
    subCategories: {
      audio: {
        id: "audio",
        label: "Audio",
        description: "Music, sound effects",
      },
      "motion-graphics": {
        id: "motion-graphics",
        label: "Motion Graphics",
        description: "Animated visuals and elements",
      },
      "video-templates": {
        id: "video-templates",
        label: "Video Templates",
        description: "Intro, outro, promo videos",
      },
    },
  },

  "3d": {
    id: "3d",
    label: "3D",
    subCategories: {
      "3d-models": {
        id: "3d-models",
        label: "3D Models",
        description: "Objects and characters",
      },
      "3d-scenes": {
        id: "3d-scenes",
        label: "3D Scenes",
        description: "Complete 3D environments",
      },
      materials: {
        id: "materials",
        label: "Materials & Textures",
        description: "PBR textures and materials",
      },
    },
  },

  business: {
    id: "business",
    label: "Business",
    subCategories: {
      presentations: {
        id: "presentations",
        label: "Presentations",
        description: "Pitch decks and slides",
      },
      documents: {
        id: "documents",
        label: "Documents",
        description: "Contracts, resumes, reports",
      },
      spreadsheets: {
        id: "spreadsheets",
        label: "Spreadsheets",
        description: "Financial models, trackers",
      },
    },
  },
};


export const ASSET_CATEGORIES_LIST: CategoryInList[] = Object.entries(ASSET_CATEGORIES).map(
  ([_, cat]) => ({
    id: cat.id,
    label: cat.label,
    subCategories: Object.entries(cat.subCategories).map(
      ([_, sub]) => ({id: sub.id, label: sub.label, description: sub.description})
    ),
  })
);