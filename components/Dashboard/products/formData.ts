import type { FilterOption, ProductFormState } from "../types"

export const ADD_PRODUCT_PAGE = {
  title: "Add New Product",
  subtitle: "Create a new jewellery product for your catalog.",
  breadcrumbs: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Products", href: "/dashboard/products" },
    { label: "Add New Product" },
  ],
} as const

export const PRODUCT_CATEGORY_OPTIONS: FilterOption[] = [
  { label: "Select category", value: "" },
  { label: "Necklaces", value: "necklaces" },
  { label: "Rings", value: "rings" },
  { label: "Earrings", value: "earrings" },
  { label: "Bracelets", value: "bracelets" },
  { label: "Pendants", value: "pendants" },
]

export const CURRENCY_OPTIONS: FilterOption[] = [
  { label: "PKR", value: "PKR" },
  { label: "USD", value: "USD" },
  { label: "AED", value: "AED" },
  { label: "GBP", value: "GBP" },
]

export const WEIGHT_UNIT_OPTIONS: FilterOption[] = [
  { label: "g", value: "g" },
  { label: "kg", value: "kg" },
  { label: "oz", value: "oz" },
]

export const METAL_TYPE_OPTIONS: FilterOption[] = [
  { label: "Select metal", value: "" },
  { label: "Gold", value: "gold" },
  { label: "Platinum", value: "platinum" },
  { label: "Silver", value: "silver" },
  { label: "Rose Gold", value: "rose-gold" },
]

export const METAL_PURITY_OPTIONS: FilterOption[] = [
  { label: "Select purity", value: "" },
  { label: "24K", value: "24k" },
  { label: "22K", value: "22k" },
  { label: "18K", value: "18k" },
  { label: "14K", value: "14k" },
  { label: "925 Sterling", value: "925" },
]

export const METAL_COLOR_OPTIONS: FilterOption[] = [
  { label: "Select color", value: "" },
  { label: "Yellow", value: "yellow" },
  { label: "White", value: "white" },
  { label: "Rose", value: "rose" },
  { label: "Two-Tone", value: "two-tone" },
]

export const GEMSTONE_OPTIONS: FilterOption[] = [
  { label: "Select gemstone", value: "" },
  { label: "Diamond", value: "diamond" },
  { label: "Emerald", value: "emerald" },
  { label: "Ruby", value: "ruby" },
  { label: "Sapphire", value: "sapphire" },
  { label: "Pearl", value: "pearl" },
  { label: "None", value: "none" },
]

export const STONE_SHAPE_OPTIONS: FilterOption[] = [
  { label: "Select shape", value: "" },
  { label: "Round", value: "round" },
  { label: "Oval", value: "oval" },
  { label: "Pear", value: "pear" },
  { label: "Emerald Cut", value: "emerald-cut" },
  { label: "Cushion", value: "cushion" },
  { label: "Marquise", value: "marquise" },
]

export const STONE_COLOR_OPTIONS: FilterOption[] = [
  { label: "Select color", value: "" },
  { label: "D-F (Colorless)", value: "d-f" },
  { label: "G-J (Near Colorless)", value: "g-j" },
  { label: "Green", value: "green" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
]

export const COUNTRY_OPTIONS: FilterOption[] = [
  { label: "Select country", value: "" },
  { label: "Pakistan", value: "pakistan" },
  { label: "India", value: "india" },
  { label: "UAE", value: "uae" },
  { label: "Italy", value: "italy" },
  { label: "Thailand", value: "thailand" },
]

export const COLLECTION_MULTI_OPTIONS: FilterOption[] = [
  { label: "Signature Collection", value: "signature" },
  { label: "Bridal Collection", value: "bridal" },
  { label: "Heritage Collection", value: "heritage" },
  { label: "Everyday Luxe", value: "everyday" },
  { label: "Royal Heritage", value: "royal-heritage" },
]

export function createEmptyProductForm(): ProductFormState {
  const now = new Date()
  return {
    name: "",
    shortDescription: "",
    category: "",
    fullDescription: "",
    media: {
      mainImage: null,
      gallery: [],
      video: null,
      images360: [],
    },
    pricing: {
      regularPrice: "",
      costPrice: "",
      currency: "PKR",
      discountSchedule: false,
      discountStart: "",
      discountEnd: "",
    },
    inventory: {
      stockQuantity: "",
      lowStockAlert: "5",
      trackInventory: true,
      allowBackOrders: false,
      weight: "",
      weightUnit: "g",
    },
    specs: {
      metalType: "",
      metalPurity: "",
      metalColor: "",
      gemstone: "",
      stoneShape: "",
      stoneColor: "",
      countryOfOrigin: "",
    },
    status: "draft",
    visibility: {
      onlineStore: true,
      search: true,
      homepage: false,
      featuredProduct: false,
    },
    collections: [],
    categories: [],
    featured: {
      newArrival: false,
      bestSeller: false,
      trending: false,
      limitedEdition: false,
      recommended: false,
    },
    publish: {
      schedulePublish: false,
      publishDate: "",
      publishTime: "",
      createdAt: now.toLocaleString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  }
}
