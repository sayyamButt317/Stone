import {
  BarChart3,
  Box,
  FileText,
  Gem,
  Grid3X3,
  Heart,
  Home,
  ImageIcon,
  Layers,
  LayoutGrid,
  LogOut,
  Megaphone,
  MessageCircle,
  Package,
  Percent,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
  Tags,
  TrendingUp,
  Upload,
  User,
  Users,
  Wallet,
} from "lucide-react"
import type {
  BestSeller,
  ChartPoint,
  InventoryStat,
  NavGroup,
  OrderRow,
  ProductRow,
  QuickAction,
  StatMetric,
} from "./types"

export const ADMIN = {
  name: "Admin",
  role: "Administrator",
  avatar: "/assest/hero.png",
} as const

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Catalog",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutGrid },
      { label: "Products", href: "/dashboard/products", icon: Package },
      { label: "Collections", href: "/dashboard/collection", icon: Layers },
      { label: "Categories", href: "/dashboard/categories", icon: Grid3X3 },
      { label: "Inventory", href: "/dashboard/inventory", icon: Box },
      { label: "Gemstones", href: "/dashboard/gemstones", icon: Gem },
      { label: "Materials", href: "/dashboard/materials", icon: Tags },
    ],
  },
  {
    title: "Orders",
    items: [
      { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
      { label: "Customers", href: "/dashboard/customers", icon: Users },
      { label: "Reviews", href: "/dashboard/reviews", icon: Star },
      { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { label: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
      { label: "Discounts", href: "/dashboard/discounts", icon: Percent },
      { label: "Coupons", href: "/dashboard/coupons", icon: Tag },
      { label: "Reports", href: "/dashboard/reports", icon: FileText },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Homepage", href: "/", icon: Home },
      { label: "Lookbook", href: "/dashboard/lookbook", icon: ImageIcon },
      { label: "Blog", href: "/dashboard/blog", icon: FileText },
      { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageCircle },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
      { label: "Team Members", href: "/dashboard/team", icon: Users },
      { label: "Profile", href: "/dashboard/account-details", icon: User },
      { label: "Logout", href: "/dashboard/logout", icon: LogOut },
    ],
  },
]

export const STAT_METRICS: StatMetric[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "PKR 12,458,750",
    change: 18.6,
    icon: Wallet,
    sparkline: [32, 38, 35, 44, 42, 50, 48, 58, 55, 62],
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "1,245",
    change: 14.2,
    icon: ShoppingBag,
    sparkline: [28, 30, 34, 33, 38, 40, 42, 45, 48, 52],
  },
  {
    id: "customers",
    label: "Total Customers",
    value: "892",
    change: 9.3,
    icon: Users,
    sparkline: [20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
  },
  {
    id: "inventory",
    label: "Inventory Value",
    value: "PKR 8,925,600",
    change: 11.7,
    icon: Box,
    sparkline: [40, 42, 41, 45, 47, 46, 50, 52, 54, 56],
  },
  {
    id: "low-stock",
    label: "Low Stock Items",
    value: "16",
    change: -12.5,
    icon: TrendingUp,
    sparkline: [60, 58, 55, 52, 48, 45, 42, 38, 35, 32],
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "2.49%",
    change: 8.1,
    icon: BarChart3,
    sparkline: [18, 20, 19, 22, 24, 23, 26, 28, 27, 30],
  },
]

export const REVENUE_CHART: ChartPoint[] = [
  { label: "1 Jun", value: 4.2 },
  { label: "5 Jun", value: 5.1 },
  { label: "10 Jun", value: 4.8 },
  { label: "15 Jun", value: 6.2 },
  { label: "20 Jun", value: 7.4 },
  { label: "25 Jun", value: 8.1 },
  { label: "30 Jun", value: 12.45 },
]

export const BEST_SELLERS: BestSeller[] = [
  {
    id: "1",
    name: "Emerald Halo Necklace",
    price: "PKR 485,000",
    sold: 42,
    image: "/assest/hero.png",
  },
  {
    id: "2",
    name: "Diamond Solitaire Ring",
    price: "PKR 320,000",
    sold: 38,
    image: "/assest/diamondring.png",
  },
  {
    id: "3",
    name: "Gold Tennis Bracelet",
    price: "PKR 275,000",
    sold: 31,
    image: "/assest/diamondbraclet.png",
  },
  {
    id: "4",
    name: "Pear Drop Earrings",
    price: "PKR 198,000",
    sold: 27,
    image: "/assest/earring.png",
  },
]

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "add-product", label: "Add Product", icon: Package, href: "/dashboard/products" },
  { id: "add-collection", label: "Add Collection", icon: Layers, href: "/dashboard/collection" },
  { id: "add-category", label: "Add Category", icon: Grid3X3, href: "/dashboard/categories" },
  { id: "inventory", label: "Manage Inventory", icon: Box, href: "/dashboard/inventory" },
  { id: "discount", label: "Create Discount", icon: Percent, href: "/dashboard/discounts" },
  { id: "coupon", label: "Add Coupon", icon: Tag, href: "/dashboard/coupons" },
  { id: "order", label: "New Order", icon: ShoppingCart, href: "/dashboard/reorders" },
  { id: "customer", label: "Add Customer", icon: User, href: "/dashboard/customers" },
]

export const LATEST_PRODUCTS: ProductRow[] = [
  {
    id: "1",
    name: "Emerald Halo Necklace",
    sku: "STN-NK-001",
    price: "PKR 485,000",
    stock: 12,
    category: "Necklaces",
    status: "active",
    image: "/assest/hero.png",
  },
  {
    id: "2",
    name: "Diamond Solitaire Ring",
    sku: "STN-RG-014",
    price: "PKR 320,000",
    stock: 8,
    category: "Rings",
    status: "active",
    image: "/assest/diamondring.png",
  },
  {
    id: "3",
    name: "Pear Drop Earrings",
    sku: "STN-ER-008",
    price: "PKR 198,000",
    stock: 3,
    category: "Earrings",
    status: "active",
    image: "/assest/earring.png",
  },
  {
    id: "4",
    name: "Gold Tennis Bracelet",
    sku: "STN-BR-022",
    price: "PKR 275,000",
    stock: 0,
    category: "Bracelets",
    status: "inactive",
    image: "/assest/diamondbraclet.png",
  },
  {
    id: "5",
    name: "Emerald Pear Pendant",
    sku: "STN-PD-005",
    price: "PKR 156,000",
    stock: 15,
    category: "Pendants",
    status: "active",
    image: "/assest/pendant.png",
  },
]

export const RECENT_ORDERS: OrderRow[] = [
  { id: "#ORD-2847", customer: "Sarah Ahmed", amount: "PKR 485,000", status: "completed" },
  { id: "#ORD-2846", customer: "James Wilson", amount: "PKR 320,000", status: "processing" },
  { id: "#ORD-2845", customer: "Aisha Khan", amount: "PKR 198,000", status: "shipped" },
  { id: "#ORD-2844", customer: "Michael Chen", amount: "PKR 275,000", status: "pending" },
  { id: "#ORD-2843", customer: "Emma Roberts", amount: "PKR 156,000", status: "completed" },
]

export const INVENTORY_SUMMARY: InventoryStat[] = [
  { label: "In Stock", value: 245, tone: "success" },
  { label: "Low Stock", value: 16, tone: "warning" },
  { label: "Out of Stock", value: 4, tone: "danger" },
  { label: "Total Products", value: 265, tone: "neutral" },
]

export const UPLOAD_LOOKBOOK: QuickAction = {
  id: "upload-lookbook",
  label: "Upload Lookbook",
  icon: Upload,
  href: "/dashboard/lookbook",
}
