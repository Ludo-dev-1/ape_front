// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  i18n: {
    defaultLocale: 'fr', // ou 'en' selon ta langue par défaut
    locales: ['fr', 'en'], // langues supportées
  },

  vite: {
    plugins: [tailwindcss()]
  }
});