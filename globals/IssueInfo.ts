import type { GlobalConfig } from 'payload'

export const IssueInfo: GlobalConfig = {
  slug: 'issue-info',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Publication-wide and issue-specific metadata shown in the masthead.',
  },
  fields: [
    { name: 'siteTitle', type: 'text', label: 'Page title (<title> tag)' },
    { name: 'siteDescription', type: 'textarea', label: 'Page meta description' },
    { name: 'publicationName', type: 'text' },
    { name: 'issueNumber', type: 'text' },
    { name: 'issueDate', type: 'text' },
    { name: 'editionType', type: 'text' },
  ],
}
