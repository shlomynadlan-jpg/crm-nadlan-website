'use client'

export default function CookieSettingsLink() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
      className="hover:text-white transition-colors cursor-pointer"
    >
      הגדרות עוגיות
    </button>
  )
}
