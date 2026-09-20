"use client"

import Link from "next/link"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Eye,
  ImageIcon,
  Info,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pencil,
  Plus,
  Underline,
  Upload,
  X,
} from "lucide-react"
import { cormorant, dk, goldGradient } from "../theme"
import type { BreadcrumbItem, DashIcon, FilterOption } from "../types"

/* ------------------------------------------------------------------ */
/*  Breadcrumbs                                                        */
/* ------------------------------------------------------------------ */

export function FormBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5 text-xs">
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span style={{ color: dk.onFaint }}>/</span>}
            {item.href && !last ? (
              <Link href={item.href} className="transition-colors hover:opacity-80" style={{ color: dk.onVar }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: last ? dk.accent : dk.onVar }}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  Numbered form section                                              */
/* ------------------------------------------------------------------ */

export function FormSection({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: dk.panelBorder, background: dk.panel }}
    >
      <div
        className="flex items-center gap-3 border-b px-5 py-4"
        style={{ borderColor: dk.panelBorder }}
      >
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold"
          style={{ background: "rgba(197,160,89,0.15)", color: dk.accent, border: `1px solid ${dk.borderStrong}` }}
        >
          {number}
        </span>
        <h2 className={`${cormorant.className} text-xl`} style={{ color: dk.on }}>
          {title}
        </h2>
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  )
}

export function SidebarCard({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: dk.panelBorder, background: dk.panel }}
    >
      <div
        className="flex items-center justify-between gap-2 border-b px-4 py-3"
        style={{ borderColor: dk.panelBorder }}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: dk.onVar }}>
          {title}
        </h3>
        {action}
      </div>
      <div className="space-y-3 p-4">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Form fields                                                        */
/* ------------------------------------------------------------------ */

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium" style={{ color: dk.onVar }}>
      {children}
      {required && <span style={{ color: dk.accent }}> *</span>}
    </label>
  )
}

const fieldBase =
  "w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors placeholder:opacity-40 focus:border-[rgba(197,160,89,0.45)]"

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  prefix,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  prefix?: string
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        {prefix && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium"
            style={{ color: dk.accent }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${fieldBase} ${prefix ? "pl-12" : ""}`}
          style={{ borderColor: dk.panelBorder, background: "rgba(0,8,8,0.55)", color: dk.on }}
        />
      </div>
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${fieldBase} resize-y`}
        style={{ borderColor: dk.panelBorder, background: "rgba(0,8,8,0.55)", color: dk.on }}
      />
    </div>
  )
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: FilterOption[]
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldBase} appearance-none pr-9`}
          style={{ borderColor: dk.panelBorder, background: "rgba(0,8,8,0.55)", color: dk.onVar }}
        >
          {options.map((o) => (
            <option key={o.value || o.label} value={o.value} style={{ background: dk.sidebar }}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2"
          style={{ color: dk.onVar }}
          strokeWidth={2}
        />
      </div>
    </div>
  )
}

export function RichTextEditor({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const tools = [Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link2, ImageIcon]

  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div
        className="overflow-hidden rounded-lg border"
        style={{ borderColor: dk.panelBorder, background: "rgba(0,8,8,0.55)" }}
      >
        <div
          className="flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5"
          style={{ borderColor: dk.panelBorder }}
        >
          {tools.map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="flex size-7 items-center justify-center rounded transition-colors hover:bg-white/[0.05]"
              style={{ color: dk.onVar }}
            >
              <Icon className="size-3.5" strokeWidth={1.8} />
            </button>
          ))}
        </div>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a detailed product description..."
          rows={6}
          className="w-full resize-y bg-transparent px-3 py-2.5 text-sm outline-none placeholder:opacity-40"
          style={{ color: dk.on }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Toggle / Checkbox / Radio                                          */
/* ------------------------------------------------------------------ */

export function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span
        className="relative h-5 w-9 shrink-0 rounded-full transition-colors"
        style={{ background: checked ? dk.accent : "rgba(107,114,128,0.35)" }}
      >
        <span
          className="absolute top-0.5 size-4 rounded-full bg-white transition-transform"
          style={{ left: checked ? "18px" : "2px" }}
        />
      </span>
      <span className="text-xs font-medium" style={{ color: dk.onVar }}>
        {label}
      </span>
    </button>
  )
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-3.5 rounded border accent-[#C5A059]"
      />
      <span className="text-xs" style={{ color: dk.onVar }}>
        {label}
      </span>
    </label>
  )
}

export function RadioField({
  name,
  label,
  value,
  checked,
  onChange,
}: {
  name: string
  label: string
  value: string
  checked: boolean
  onChange: (v: string) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="size-3.5 accent-[#C5A059]"
      />
      <span className="text-xs" style={{ color: dk.onVar }}>
        {label}
      </span>
    </label>
  )
}

/* ------------------------------------------------------------------ */
/*  Media upload zones                                                 */
/* ------------------------------------------------------------------ */

export function MediaDropZone({
  title,
  hint,
  compact,
}: {
  title: string
  hint?: string
  compact?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed text-center transition-colors hover:border-[rgba(197,160,89,0.4)] ${compact ? "min-h-[100px] p-4" : "min-h-[160px] p-6"}`}
      style={{ borderColor: dk.panelBorder, background: "rgba(0,8,8,0.4)" }}
    >
      <Upload className="mb-2 size-6" style={{ color: dk.accent }} strokeWidth={1.5} />
      <p className="text-sm font-medium" style={{ color: dk.on }}>
        {title}
      </p>
      {hint && (
        <p className="mt-1 text-[11px]" style={{ color: dk.onFaint }}>
          {hint}
        </p>
      )}
      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors hover:bg-white/[0.03]"
        style={{ borderColor: dk.borderStrong, color: dk.accent }}
      >
        <Upload className="size-3" strokeWidth={2} />
        Upload Images
      </button>
    </div>
  )
}

export function MediaSlot({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed"
      style={{ borderColor: dk.panelBorder, background: "rgba(0,8,8,0.4)" }}
    >
      <ImageIcon className="mb-1 size-5" style={{ color: dk.onFaint }} strokeWidth={1.5} />
      <span className="text-[10px]" style={{ color: dk.onFaint }}>
        {label}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Outline / Gold action buttons                                      */
/* ------------------------------------------------------------------ */

export function OutlineButton({
  children,
  icon: Icon,
  href,
  onClick,
  danger,
}: {
  children: React.ReactNode
  icon?: DashIcon
  href?: string
  onClick?: () => void
  danger?: boolean
}) {
  const className =
    "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-white/[0.03]"
  const style = {
    borderColor: danger ? dk.danger : dk.panelBorder,
    color: danger ? dk.danger : dk.onVar,
  }

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {Icon && <Icon className="size-3.5" strokeWidth={1.8} />}
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {Icon && <Icon className="size-3.5" strokeWidth={1.8} />}
      {children}
    </button>
  )
}

export function PrimaryGoldButton({
  children,
  icon: Icon,
  onClick,
  type = "button",
}: {
  children: React.ReactNode
  icon?: DashIcon
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all hover:brightness-110"
      style={{ background: goldGradient, color: dk.surfaceDeep }}
    >
      {Icon && <Icon className="size-4" strokeWidth={2} />}
      {children}
    </button>
  )
}

export function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder = "Press enter to add tags",
}: {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium"
            style={{ background: "rgba(197,160,89,0.15)", color: dk.accent }}
          >
            {tag}
            <button type="button" aria-label={`Remove ${tag}`} onClick={() => onRemove(tag)}>
              <X className="size-3" strokeWidth={2} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={fieldBase}
        style={{ borderColor: dk.panelBorder, background: "rgba(0,8,8,0.55)", color: dk.on }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return
          e.preventDefault()
          const value = (e.target as HTMLInputElement).value.trim()
          if (!value) return
          onAdd(value)
          ;(e.target as HTMLInputElement).value = ""
        }}
      />
    </div>
  )
}

export function CreateNewLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide transition-opacity hover:opacity-80"
      style={{ color: dk.accent }}
    >
      <Plus className="size-3" strokeWidth={2.5} />
      {label}
    </button>
  )
}

export function DraftNote() {
  return (
    <div
      className="flex items-start gap-2 rounded-lg border px-3 py-2.5"
      style={{ borderColor: dk.panelBorder, background: "rgba(197,160,89,0.06)" }}
    >
      <Info className="mt-0.5 size-3.5 shrink-0" style={{ color: dk.accent }} strokeWidth={1.8} />
      <p className="text-[11px] leading-relaxed" style={{ color: dk.onVar }}>
        Changes you make will be saved as draft until you publish.
      </p>
    </div>
  )
}

export function VariantEditButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-md border transition-colors hover:bg-white/[0.04]"
      style={{ borderColor: dk.panelBorder, color: dk.accent }}
    >
      <Pencil className="size-3.5" strokeWidth={1.8} />
    </button>
  )
}

export { Eye }
