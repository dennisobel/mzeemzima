import type { CollectionConfig } from 'payload'

export const ARTICLE_SLOTS = [
  { label: 'Headline (top story)', value: 'headline' },
  { label: 'Main hero image', value: 'main-image' },
  { label: 'Feature plan (double-span)', value: 'feature-plan' },
  { label: 'Food topic', value: 'food-topic' },
  { label: 'Publication preview', value: 'publication-preview' },
  { label: 'Design topic', value: 'design-topic' },
  { label: 'Feature toggle', value: 'feature-toggle' },
  { label: 'Grid gallery', value: 'gallery' },
  { label: 'Sidebar tech feature #1', value: 'tech-feature-1' },
  { label: 'Sidebar captcha story', value: 'captcha' },
  { label: 'Sidebar bootcamp feature', value: 'bootcamp-feature' },
  { label: 'Sidebar tech feature #2', value: 'tech-feature-2' },
] as const

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slot', 'updatedAt'],
    description:
      'Each article is pinned to a fixed slot on the front page grid. Only one article per slot is shown.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slot',
      type: 'select',
      required: true,
      unique: true,
      options: [...ARTICLE_SLOTS],
      admin: {
        description: 'Which fixed position on the front page this article fills.',
      },
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'href',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'ariaLabel',
      type: 'text',
      admin: {
        description: 'Accessibility label override. Falls back to the title if left empty.',
      },
    },
  ],
}
