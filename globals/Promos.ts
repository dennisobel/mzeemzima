import type { GlobalConfig } from 'payload'

export const Promos: GlobalConfig = {
  slug: 'promos',
  access: {
    read: () => true,
  },
  admin: {
    description: 'The three fixed advertisement/promo units on the front page.',
  },
  fields: [
    {
      name: 'hogwartsBanner',
      type: 'group',
      label: 'Promo banner',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'badge', type: 'text', admin: { description: 'e.g. "Limited time offer"' } },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'href', type: 'text', defaultValue: '#' },
        { name: 'ariaLabel', type: 'text' },
      ],
    },
    {
      name: 'techTrendsSocial',
      type: 'group',
      label: 'Social promo',
      fields: [
        { name: 'subtitle', type: 'text' },
        { name: 'body', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'href', type: 'text', defaultValue: '#' },
        { name: 'ariaLabel', type: 'text' },
      ],
    },
    {
      name: 'toastyMenu',
      type: 'group',
      label: 'Menu promo',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
        { name: 'href', type: 'text', defaultValue: '#' },
        { name: 'ariaLabel', type: 'text' },
      ],
    },
  ],
}
