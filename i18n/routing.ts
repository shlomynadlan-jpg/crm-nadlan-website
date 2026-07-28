import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['he', 'en', 'fr', 'ru'],
  defaultLocale: 'he',
})
