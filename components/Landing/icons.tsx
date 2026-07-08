import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

/** Ring icon — Lucide removed brand/decorative icons in v1.x */
export function RingIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="14" r="6" />
      <path d="M12 8V6" />
      <path d="M10 6h4" />
      <circle cx="12" cy="14" r="2.5" fill="currentColor" stroke="none" opacity="0.35" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function PinterestIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6c-2.5 0-4 1.8-4 4.2 0 1.6.8 2.5 2 2.9.2.1.4 0 .5-.2l.4-1.5c0-.2 0-.3-.1-.4-.3-.4-.5-.9-.5-1.5 0-1.2 1-2.2 2.3-2.2 1.2 0 1.9.7 1.9 1.8 0 1.3-.5 2.4-1.3 2.4-.4 0-.7-.3-.6-.8.1-.3.3-1 .3-1.3.1-.4-.2-.8-.7-.8-1 0-1.7 1-1.7 2.4 0 .9.3 1.5.3 1.5l-1.2 5.1c-.3 1.3-.1 2.9-.1 3.2 0 .1.1.2.2.2.1 0 .4-.1.9-1.6 0 0 .5-1.8.6-2.2.1-.2.5-1.1.5-1.1.3.5 1.1 1 2 1 2.6 0 4.4-2.4 4.4-5.6C16.5 8.1 14.6 6 12 6z" />
    </svg>
  )
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" stroke="none" />
    </svg>
  )
}
