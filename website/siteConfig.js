/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Viron' /* title for your website */,
  tagline: 'Automated design-based management console',
  url: 'https://cam-inc.github.io/viron/v1' /* your website url */,
  baseUrl: '/viron-doc/' /* base url for your project */,
  projectName: 'viron-doc',
  headerLinks: [
    {doc: 'demo', label: 'ドキュメント'},
    {blog: true, label: 'ブログ'}
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/viron.svg',
  footerIcon: 'img/viron.svg',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: 'white',
    secondaryColor: '#a3a3a3',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' CA MOBILE, Ltd.',
  organizationName: 'cam-inc', // or set an env variable ORGANIZATION_NAME
  projectName: 'viron-doc', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/cam-inc/viron',
};

module.exports = siteConfig;
