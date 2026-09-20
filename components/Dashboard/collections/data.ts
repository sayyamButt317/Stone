import { CheckCircle2, Layers, Package, Wallet } from "lucide-react"
import type { FilterOption, JewelryCollection, SummaryStat } from "../types"

export const COLLECTIONS_PAGE = {
  title: "Collections",
  subtitle: "Organize and manage your jewellery collections.",
  searchPlaceholder: "Search collections by name or category...",
  tableSearchPlaceholder: "Search collections...",
  totalCount: 24,
  entityLabel: "collections",
} as const

export const COLLECTION_SUMMARY_STATS: SummaryStat[] = [
  { id: "total", label: "Total Collections", value: "24", change: 14.3, icon: Layers },
  { id: "published", label: "Published Collections", value: "21", change: 10.5, icon: CheckCircle2 },
  { id: "products", label: "Total Products", value: "356", change: 12.7, icon: Package },
  { id: "value", label: "Total Value", value: "PKR 89,250,000", change: 16.9, icon: Wallet },
]

export const COLLECTION_STATUS_FILTERS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
]

export const COLLECTION_CATEGORY_FILTERS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Necklaces", value: "necklaces" },
  { label: "Rings", value: "rings" },
  { label: "Earrings", value: "earrings" },
  { label: "Bracelets", value: "bracelets" },
  { label: "Mixed", value: "mixed" },
]

export const COLLECTION_VISIBILITY_FILTERS: FilterOption[] = [
  { label: "All Visibility", value: "all" },
  { label: "Visible", value: "visible" },
  { label: "Hidden", value: "hidden" },
]

export const COLLECTION_SORT_OPTIONS: FilterOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Products", value: "products-desc" },
  { label: "Name A–Z", value: "name-asc" },
]

export const JEWELRY_COLLECTIONS: JewelryCollection[] = [
  {
    id: "1",
    name: "Signature Collection",
    description: "Our flagship line of emerald and diamond masterpieces crafted for timeless elegance.",
    image: "/assest/hero.png",
    productCount: 48,
    category: "Mixed",
    status: "published",
    visible: true,
    createdAt: "May 12, 2024",
  },
  {
    id: "2",
    name: "Bridal Collection",
    description: "Exquisite rings and sets designed for life's most precious moments.",
    image: "/assest/diamondring.png",
    productCount: 62,
    category: "Rings",
    status: "published",
    visible: true,
    createdAt: "Apr 28, 2024",
  },
  {
    id: "3",
    name: "Heritage Collection",
    description: "Classic designs inspired by generations of master craftsmanship.",
    image: "/assest/earring.png",
    productCount: 35,
    category: "Earrings",
    status: "published",
    visible: true,
    createdAt: "Mar 15, 2024",
  },
  {
    id: "4",
    name: "Everyday Luxe",
    description: "Refined pieces for daily wear without compromising on quality.",
    image: "/assest/diamondbraclet.png",
    productCount: 41,
    category: "Bracelets",
    status: "published",
    visible: true,
    createdAt: "Feb 8, 2024",
  },
  {
    id: "5",
    name: "Emerald Dreams",
    description: "A curated selection celebrating the beauty of Colombian emeralds.",
    image: "/assest/pendant.png",
    productCount: 28,
    category: "Necklaces",
    status: "draft",
    visible: false,
    createdAt: "Jan 22, 2024",
  },
  {
    id: "6",
    name: "Diamond Essentials",
    description: "Pure brilliance — solitaires and tennis pieces for every occasion.",
    image: "/assest/diamondring.png",
    productCount: 54,
    category: "Rings",
    status: "published",
    visible: true,
    createdAt: "Dec 5, 2023",
  },
  {
    id: "7",
    name: "Vintage Revival",
    description: "Art-deco inspired settings with a contemporary Velora twist.",
    image: "/assest/gemstone.png",
    productCount: 19,
    category: "Mixed",
    status: "archived",
    visible: false,
    createdAt: "Nov 18, 2023",
  },
  {
    id: "8",
    name: "Pearl & Gold",
    description: "Warm gold tones paired with luminous pearls and soft gemstones.",
    image: "/assest/earring.png",
    productCount: 31,
    category: "Earrings",
    status: "published",
    visible: true,
    createdAt: "Oct 3, 2023",
  },
]
