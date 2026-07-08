import {
  AlertTriangle,
  CheckCircle2,
  Package,
  Wallet,
  XCircle,
} from "lucide-react"
import type { FilterOption, InventoryItem, StatMetric } from "../types"

export const INVENTORY_PAGE = {
  title: "Inventory",
  subtitle: "Track stock levels, manage inventory and get low stock alerts.",
  searchPlaceholder: "Search by product name, SKU or barcode...",
  tableSearchPlaceholder: "Search inventory...",
  totalCount: 245,
  entityLabel: "items",
  defaultPageSize: 8,
  pageSizeOptions: [8, 10, 25, 50],
} as const

export const INVENTORY_METRICS: StatMetric[] = [
  {
    id: "total-value",
    label: "Total Inventory Value",
    value: "PKR 8,925,600",
    change: 15.8,
    icon: Wallet,
    sparkline: [40, 42, 44, 43, 47, 49, 52, 54, 56, 58],
  },
  {
    id: "total-stock",
    label: "Total Stock (Units)",
    value: "1,842",
    change: 8.4,
    icon: Package,
    sparkline: [30, 32, 31, 35, 36, 38, 40, 41, 43, 45],
  },
  {
    id: "low-stock",
    label: "Low Stock Items",
    value: "16",
    change: -20.0,
    icon: AlertTriangle,
    sparkline: [60, 58, 55, 50, 48, 44, 40, 36, 34, 32],
  },
  {
    id: "out-of-stock",
    label: "Out of Stock Items",
    value: "4",
    change: -33.3,
    icon: XCircle,
    sparkline: [20, 18, 16, 14, 12, 10, 8, 6, 5, 4],
  },
  {
    id: "in-stock",
    label: "In Stock Items",
    value: "225",
    change: 10.3,
    icon: CheckCircle2,
    sparkline: [50, 52, 54, 55, 57, 58, 60, 62, 64, 66],
  },
]

export const INVENTORY_CATEGORY_FILTERS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Necklaces", value: "necklaces" },
  { label: "Rings", value: "rings" },
  { label: "Earrings", value: "earrings" },
  { label: "Bracelets", value: "bracelets" },
  { label: "Pendants", value: "pendants" },
]

export const INVENTORY_COLLECTION_FILTERS: FilterOption[] = [
  { label: "All Collections", value: "all" },
  { label: "Royal Heritage", value: "royal-heritage" },
  { label: "Diamond Collection", value: "diamond" },
  { label: "Signature Collection", value: "signature" },
  { label: "Bridal Collection", value: "bridal" },
  { label: "Heritage Collection", value: "heritage" },
  { label: "Everyday Luxe", value: "everyday" },
]

export const INVENTORY_STATUS_FILTERS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "In Stock", value: "in_stock" },
  { label: "Low Stock", value: "low_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
]

export const INVENTORY_LOCATION_FILTERS: FilterOption[] = [
  { label: "All Locations", value: "all" },
  { label: "Main Warehouse", value: "main-warehouse" },
  { label: "Branch Store A", value: "branch-a" },
  { label: "Branch Store B", value: "branch-b" },
  { label: "Flagship Showroom", value: "flagship" },
]

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "1",
    name: "Royal Emerald Necklace",
    collection: "Royal Heritage",
    sku: "SKU-001",
    category: "Necklaces",
    stock: 24,
    reserved: 3,
    available: 21,
    status: "in_stock",
    location: "Main Warehouse",
    value: "PKR 485,000",
    image: "/assest/hero.png",
  },
  {
    id: "2",
    name: "Diamond Grace Ring",
    collection: "Diamond Collection",
    sku: "SKU-014",
    category: "Rings",
    stock: 18,
    reserved: 2,
    available: 16,
    status: "in_stock",
    location: "Main Warehouse",
    value: "PKR 320,000",
    image: "/assest/diamondring.png",
  },
  {
    id: "3",
    name: "Pear Drop Earrings",
    collection: "Heritage Collection",
    sku: "SKU-008",
    category: "Earrings",
    stock: 5,
    reserved: 1,
    available: 4,
    status: "low_stock",
    location: "Branch Store A",
    value: "PKR 198,000",
    image: "/assest/earring.png",
  },
  {
    id: "4",
    name: "Gold Tennis Bracelet",
    collection: "Everyday Luxe",
    sku: "SKU-022",
    category: "Bracelets",
    stock: 0,
    reserved: 0,
    available: 0,
    status: "out_of_stock",
    location: "Main Warehouse",
    value: "PKR 275,000",
    image: "/assest/diamondbraclet.png",
  },
  {
    id: "5",
    name: "Emerald Pear Pendant",
    collection: "Signature Collection",
    sku: "SKU-005",
    category: "Pendants",
    stock: 32,
    reserved: 4,
    available: 28,
    status: "in_stock",
    location: "Flagship Showroom",
    value: "PKR 156,000",
    image: "/assest/pendant.png",
  },
  {
    id: "6",
    name: "Celestial Diamond Band",
    collection: "Bridal Collection",
    sku: "SKU-019",
    category: "Rings",
    stock: 12,
    reserved: 5,
    available: 7,
    status: "in_stock",
    location: "Branch Store B",
    value: "PKR 245,000",
    image: "/assest/diamondring.png",
  },
  {
    id: "7",
    name: "Verdant Stud Earrings",
    collection: "Everyday Luxe",
    sku: "SKU-011",
    category: "Earrings",
    stock: 3,
    reserved: 0,
    available: 3,
    status: "low_stock",
    location: "Branch Store A",
    value: "PKR 142,000",
    image: "/assest/earring.png",
  },
  {
    id: "8",
    name: "Heritage Emerald Choker",
    collection: "Royal Heritage",
    sku: "SKU-007",
    category: "Necklaces",
    stock: 8,
    reserved: 1,
    available: 7,
    status: "in_stock",
    location: "Main Warehouse",
    value: "PKR 620,000",
    image: "/assest/hero.png",
  },
  {
    id: "9",
    name: "Sapphire Halo Ring",
    collection: "Diamond Collection",
    sku: "SKU-031",
    category: "Rings",
    stock: 14,
    reserved: 2,
    available: 12,
    status: "in_stock",
    location: "Flagship Showroom",
    value: "PKR 385,000",
    image: "/assest/diamondring.png",
  },
  {
    id: "10",
    name: "Rose Gold Cuff Bracelet",
    collection: "Signature Collection",
    sku: "SKU-028",
    category: "Bracelets",
    stock: 2,
    reserved: 1,
    available: 1,
    status: "low_stock",
    location: "Branch Store B",
    value: "PKR 210,000",
    image: "/assest/diamondbraclet.png",
  },
]

/** Maps collection display name → filter slug */
export function collectionKey(name: string): string {
  const map: Record<string, string> = {
    "Royal Heritage": "royal-heritage",
    "Diamond Collection": "diamond",
    "Signature Collection": "signature",
    "Bridal Collection": "bridal",
    "Heritage Collection": "heritage",
    "Everyday Luxe": "everyday",
  }
  return map[name] ?? name.toLowerCase().replace(/\s+/g, "-")
}

/** Maps location display name → filter slug */
export function locationKey(name: string): string {
  const map: Record<string, string> = {
    "Main Warehouse": "main-warehouse",
    "Branch Store A": "branch-a",
    "Branch Store B": "branch-b",
    "Flagship Showroom": "flagship",
  }
  return map[name] ?? name.toLowerCase().replace(/\s+/g, "-")
}

/** Maps category display name → filter slug */
export function categoryKey(name: string): string {
  return name.toLowerCase()
}
