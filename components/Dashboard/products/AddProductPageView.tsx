"use client"

import { useState } from "react"
import { Eye, Plus, Save } from "lucide-react"
import { useMountFade } from "../hooks/useGsap"
import { NotificationBell } from "../ui/catalogPage"
import {
  CheckboxField,
  CreateNewLink,
  DraftNote,
  FormBreadcrumbs,
  FormSection,
  MediaDropZone,
  MediaSlot,
  OutlineButton,
  PrimaryGoldButton,
  RadioField,
  RichTextEditor,
  SelectField,
  SidebarCard,
  TextAreaField,
  TextField,
  ToggleField,
} from "../ui/productForm"
import { cormorant, dk } from "../theme"
import type { ProductFormState, ProductPublishStatus } from "../types"
import {
  ADD_PRODUCT_PAGE,
  COLLECTION_MULTI_OPTIONS,
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  GEMSTONE_OPTIONS,
  METAL_COLOR_OPTIONS,
  METAL_PURITY_OPTIONS,
  METAL_TYPE_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  STONE_COLOR_OPTIONS,
  STONE_SHAPE_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
  createEmptyProductForm,
} from "./formData"

export default function AddProductPageView() {
  const headerRef = useMountFade<HTMLElement>(0.05)
  const [form, setForm] = useState<ProductFormState>(createEmptyProductForm)

  function patch<K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function patchNested<K extends keyof ProductFormState>(
    key: K,
    nested: Partial<ProductFormState[K]>,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as object), ...nested } as ProductFormState[K],
    }))
  }

  function toggleCollection(value: string) {
    setForm((prev) => ({
      ...prev,
      collections: prev.collections.includes(value)
        ? prev.collections.filter((c) => c !== value)
        : [...prev.collections, value],
    }))
  }

  return (
    <div className="min-h-screen px-4 pb-28 pt-20 lg:px-8 lg:pt-8">
      <header ref={headerRef} className="mb-8">
        <FormBreadcrumbs items={[...ADD_PRODUCT_PAGE.breadcrumbs]} />

        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className={`${cormorant.className} text-3xl sm:text-4xl`} style={{ color: dk.on }}>
              {ADD_PRODUCT_PAGE.title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: dk.onVar }}>
              {ADD_PRODUCT_PAGE.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <NotificationBell />
            <OutlineButton href="/dashboard/products">Cancel</OutlineButton>
            <OutlineButton icon={Save}>Save Draft</OutlineButton>
            <OutlineButton icon={Eye}>Preview</OutlineButton>
            <PrimaryGoldButton icon={Plus}>Publish Product</PrimaryGoldButton>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          {/* 1. Product Information */}
          <FormSection number={1} title="Product Information">
            <TextField
              id="name"
              label="Product Name"
              value={form.name}
              onChange={(v) => patch("name", v)}
              placeholder="e.g. Royal Emerald Necklace"
              required
            />
            <TextAreaField
              id="short-desc"
              label="Short Description"
              value={form.shortDescription}
              onChange={(v) => patch("shortDescription", v)}
              placeholder="A brief summary shown on product cards..."
              rows={2}
            />
            <SelectField
              id="category"
              label="Category"
              value={form.category}
              onChange={(v) => patch("category", v)}
              options={PRODUCT_CATEGORY_OPTIONS}
            />
            <RichTextEditor
              id="full-desc"
              label="Full Description"
              value={form.fullDescription}
              onChange={(v) => patch("fullDescription", v)}
            />
          </FormSection>

          {/* 2. Product Images */}
          <FormSection number={2} title="Product Images">
            <MediaDropZone
              title="Drag & Drop images here"
              hint="PNG, JPG or WEBP · Max 5MB each"
            />
            <div>
              <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                Main Image
              </p>
              <div className="grid max-w-[140px] grid-cols-1 gap-3">
                <MediaSlot label="Main" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                Gallery Images
              </p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MediaSlot key={i} label={`Image ${i + 1}`} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                  Video (Optional)
                </p>
                <MediaDropZone title="Upload product video" compact />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: dk.onVar }}>
                  360° Images (Optional)
                </p>
                <MediaDropZone title="Upload 360° spin images" compact />
              </div>
            </div>
          </FormSection>

          {/* 3. Pricing */}
          <FormSection number={3} title="Pricing">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                id="regular-price"
                label="Regular Price"
                value={form.pricing.regularPrice}
                onChange={(v) => patchNested("pricing", { regularPrice: v })}
                placeholder="0.00"
                prefix="PKR"
              />
              <TextField
                id="cost-price"
                label="Cost Price"
                value={form.pricing.costPrice}
                onChange={(v) => patchNested("pricing", { costPrice: v })}
                placeholder="0.00"
                prefix="PKR"
              />
            </div>
            <SelectField
              id="currency"
              label="Currency"
              value={form.pricing.currency}
              onChange={(v) => patchNested("pricing", { currency: v })}
              options={CURRENCY_OPTIONS}
            />
            <ToggleField
              label="Discount Schedule"
              checked={form.pricing.discountSchedule}
              onChange={(v) => patchNested("pricing", { discountSchedule: v })}
            />
            {form.pricing.discountSchedule && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  id="discount-start"
                  label="Start Date"
                  value={form.pricing.discountStart}
                  onChange={(v) => patchNested("pricing", { discountStart: v })}
                  placeholder="YYYY-MM-DD"
                />
                <TextField
                  id="discount-end"
                  label="End Date"
                  value={form.pricing.discountEnd}
                  onChange={(v) => patchNested("pricing", { discountEnd: v })}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            )}
          </FormSection>

          {/* 4. Inventory */}
          <FormSection number={4} title="Inventory">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                id="stock-qty"
                label="Stock Quantity"
                value={form.inventory.stockQuantity}
                onChange={(v) => patchNested("inventory", { stockQuantity: v })}
                placeholder="0"
              />
              <TextField
                id="low-stock"
                label="Low Stock Alert"
                value={form.inventory.lowStockAlert}
                onChange={(v) => patchNested("inventory", { lowStockAlert: v })}
                placeholder="5"
              />
            </div>
            <div className="flex flex-wrap gap-6">
              <CheckboxField
                label="Track inventory"
                checked={form.inventory.trackInventory}
                onChange={(v) => patchNested("inventory", { trackInventory: v })}
              />
              <CheckboxField
                label="Allow Back Orders"
                checked={form.inventory.allowBackOrders}
                onChange={(v) => patchNested("inventory", { allowBackOrders: v })}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                id="weight"
                label="Weight"
                value={form.inventory.weight}
                onChange={(v) => patchNested("inventory", { weight: v })}
                placeholder="0.00"
              />
              <SelectField
                id="weight-unit"
                label="Unit"
                value={form.inventory.weightUnit}
                onChange={(v) => patchNested("inventory", { weightUnit: v })}
                options={WEIGHT_UNIT_OPTIONS}
              />
            </div>
          </FormSection>

          {/* 5. Jewellery Specifications */}
          <FormSection number={5} title="Jewellery Specifications">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField
                id="metal-type"
                label="Metal Type"
                value={form.specs.metalType}
                onChange={(v) => patchNested("specs", { metalType: v })}
                options={METAL_TYPE_OPTIONS}
              />
              <SelectField
                id="metal-purity"
                label="Metal Purity"
                value={form.specs.metalPurity}
                onChange={(v) => patchNested("specs", { metalPurity: v })}
                options={METAL_PURITY_OPTIONS}
              />
              <SelectField
                id="metal-color"
                label="Metal Color"
                value={form.specs.metalColor}
                onChange={(v) => patchNested("specs", { metalColor: v })}
                options={METAL_COLOR_OPTIONS}
              />
              <SelectField
                id="gemstone"
                label="Gemstone"
                value={form.specs.gemstone}
                onChange={(v) => patchNested("specs", { gemstone: v })}
                options={GEMSTONE_OPTIONS}
              />
              <SelectField
                id="stone-shape"
                label="Stone Shape"
                value={form.specs.stoneShape}
                onChange={(v) => patchNested("specs", { stoneShape: v })}
                options={STONE_SHAPE_OPTIONS}
              />
              <SelectField
                id="stone-color"
                label="Stone Color"
                value={form.specs.stoneColor}
                onChange={(v) => patchNested("specs", { stoneColor: v })}
                options={STONE_COLOR_OPTIONS}
              />
              <SelectField
                id="country"
                label="Country of Origin"
                value={form.specs.countryOfOrigin}
                onChange={(v) => patchNested("specs", { countryOfOrigin: v })}
                options={COUNTRY_OPTIONS}
              />
            </div>
          </FormSection>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 xl:sticky xl:top-8 xl:self-start">
          <SidebarCard title="Product Status">
            {(["draft", "active", "archived"] as ProductPublishStatus[]).map((status) => (
              <RadioField
                key={status}
                name="product-status"
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                value={status}
                checked={form.status === status}
                onChange={(v) => patch("status", v as ProductPublishStatus)}
              />
            ))}
          </SidebarCard>

          <SidebarCard title="Visibility">
            <CheckboxField
              label="Online Store"
              checked={form.visibility.onlineStore}
              onChange={(v) => patchNested("visibility", { onlineStore: v })}
            />
            <CheckboxField
              label="Search"
              checked={form.visibility.search}
              onChange={(v) => patchNested("visibility", { search: v })}
            />
            <CheckboxField
              label="Homepage"
              checked={form.visibility.homepage}
              onChange={(v) => patchNested("visibility", { homepage: v })}
            />
            <CheckboxField
              label="Featured Product"
              checked={form.visibility.featuredProduct}
              onChange={(v) => patchNested("visibility", { featuredProduct: v })}
            />
          </SidebarCard>

          <SidebarCard title="Collections" action={<CreateNewLink label="Create New" />}>
            {COLLECTION_MULTI_OPTIONS.map((opt) => (
              <CheckboxField
                key={opt.value}
                label={opt.label}
                checked={form.collections.includes(opt.value)}
                onChange={() => toggleCollection(opt.value)}
              />
            ))}
          </SidebarCard>

          <SidebarCard title="Categories" action={<CreateNewLink label="Create New" />}>
            {PRODUCT_CATEGORY_OPTIONS.filter((o) => o.value).map((opt) => (
              <CheckboxField
                key={opt.value}
                label={opt.label}
                checked={form.categories.includes(opt.value)}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    categories: prev.categories.includes(opt.value)
                      ? prev.categories.filter((c) => c !== opt.value)
                      : [...prev.categories, opt.value],
                  }))
                }
              />
            ))}
          </SidebarCard>

          <SidebarCard title="Featured">
            <CheckboxField
              label="New Arrival"
              checked={form.featured.newArrival}
              onChange={(v) => patchNested("featured", { newArrival: v })}
            />
            <CheckboxField
              label="Best Seller"
              checked={form.featured.bestSeller}
              onChange={(v) => patchNested("featured", { bestSeller: v })}
            />
            <CheckboxField
              label="Trending"
              checked={form.featured.trending}
              onChange={(v) => patchNested("featured", { trending: v })}
            />
            <CheckboxField
              label="Limited Edition"
              checked={form.featured.limitedEdition}
              onChange={(v) => patchNested("featured", { limitedEdition: v })}
            />
            <CheckboxField
              label="Recommended"
              checked={form.featured.recommended}
              onChange={(v) => patchNested("featured", { recommended: v })}
            />
          </SidebarCard>

          <SidebarCard title="Publish">
            <p className="text-[11px]" style={{ color: dk.onFaint }}>
              Created at {form.publish.createdAt}
            </p>
            <ToggleField
              label="Schedule Publish"
              checked={form.publish.schedulePublish}
              onChange={(v) => patchNested("publish", { schedulePublish: v })}
            />
            {form.publish.schedulePublish && (
              <div className="space-y-3">
                <TextField
                  id="publish-date"
                  label="Publish Date"
                  value={form.publish.publishDate}
                  onChange={(v) => patchNested("publish", { publishDate: v })}
                  placeholder="YYYY-MM-DD"
                />
                <TextField
                  id="publish-time"
                  label="Publish Time"
                  value={form.publish.publishTime}
                  onChange={(v) => patchNested("publish", { publishTime: v })}
                  placeholder="HH:MM"
                />
              </div>
            )}
            <DraftNote />
          </SidebarCard>
        </aside>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3 backdrop-blur-md lg:left-[260px]"
        style={{
          borderColor: dk.panelBorder,
          background: "rgba(0,8,8,0.92)",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs" style={{ color: dk.onVar }}>
            <span style={{ color: dk.accent }}>●</span> Unsaved changes · Last auto-saved 2 minutes ago
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <OutlineButton href="/dashboard/products">Cancel</OutlineButton>
            <OutlineButton icon={Save}>Save Draft</OutlineButton>
            <PrimaryGoldButton icon={Plus}>Publish Product</PrimaryGoldButton>
          </div>
        </div>
      </div>
    </div>
  )
}
