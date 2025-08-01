import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Open Store",
  description: "Open Store Documentation",
  lastUpdated: true,
  cleanUrls: true,
  assetsDir: 'static',

  themeConfig: {
    logo: '/static/logo.svg',
    nav: [
      { 
        text: 'Main',
        link: '/',
        activeMatch: '^/$|^/[^/]+$'
      },
      { 
        text: 'Docs',
        link: '/docs/how-it-works',
        activeMatch: '/docs'
      },
      { 
        text: 'Changelog',
        link: '/changelog/history.md',
        activeMatch: '/changelog/'
      },
    ],

    sidebar: {
      "/": [
        {
          text: 'Main',
          items: [
            { text: 'Open Store', link: '/' },
            { text: 'Privacy Policy', link: '/privacy-policy' },
            { text: 'Terms of Service', link: '/terms-of-service' }
          ]
        }
      ],
      
      "/docs/": [
        {
          text: 'Documentation',
          items: [
            { text: 'How it works?', link: '/docs/how-it-works' },
            { text: 'Billing and Fees', link: '/docs/billing-and-fees' },
            { text: 'Publishing Process', link: '/docs/publishing-process' }
          ]
        }
      ],
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/Open-Store-Foundation/docs/edit/main/:path'
    },

    footer: {
      message: 'Released under the Apache License 2.0.',
      copyright: 'Copyright © 2025 Open Store Foundation'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Open-Store-Foundation' },
      { icon: 'x', link: 'https://x.com/openstorefnd' },
      { icon: 'discord', link: 'https://discord.gg/CPmjuPNt' },
      { icon: 'telegram', link: 'https://t.me/openstore_community' },
    ]
  }
})
