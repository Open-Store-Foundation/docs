import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Open Store Docs",
  description: "Open Store Documentation",
  lastUpdated: true,
  cleanUrls: true,
  srcDir: 'src',

  sitemap: {
    hostname: 'https://docs.openstore.foundation',
    transformItems: (items) => {
      items.forEach(item => {
        item.changefreq = 'monthly'
      })
      return items
    }
  },
  
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'shortcut icon', href: '/logo.svg' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
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
      message: 'Released under the MIT License.',
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
