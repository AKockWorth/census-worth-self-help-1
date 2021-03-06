const { excludeDraftArticle } = require(`./src/utils/draft-excluder`)

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        orientation: `portrait`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/_build/content/`
      }
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Set of article fields we search on.
        fields: [`title`, `description`, `tags`, `body`, `roles`],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            description: node => node.frontmatter.description,
            tags: node => node.frontmatter.tags,
            body: node => node.rawMarkdownBody,
            roles: node => node.frontmatter.roles
          }
        },
        // Remove .md with no content
        filter: (node, getNode) => {
          return node.rawMarkdownBody.trim() != "" && !excludeDraftArticle(node)
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./static/favicon.png"
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        maximumFileSizeToCacheInBytes: 100000000,
        globPatterns: ["**/*.{css,js,json,html,svg,woff,woff2,ttf}"],
        runtimeCaching: [
          {
            urlPattern: /online/,
            handler: `networkOnly`
          },
          {
            urlPattern: /api\/.*/,
            handler: `networkOnly`
          },
          {
            urlPattern: /cms.js$/,
            handler: `cacheFirst`,
            options: {
              cacheName: "netlify-cms",
              expiration: {
                maxAgeSeconds: 3600,
                purgeOnQuotaError: true
              }
            }
          },
          {
            urlPattern: /sw.js$/,
            handler: `staleWhileRevalidate`
          },
          {
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `cacheFirst`
          },
          {
            urlPattern: /.*\.(jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`
          }
        ]
      }
    }
  ]
}

if (!process.env.DISABLE_NETLIFY) {
  module.exports.plugins.push({
    resolve: `gatsby-plugin-netlify-cms`,
    options: {
      manualInit: true,
      modulePath: `${__dirname}/src/cms/cms.js`
    }
  })
}

if (process.env.ENABLE_MATOMO) {
  module.exports.plugins.push({
    resolve: "gatsby-plugin-matomo",
    options: {
      siteId: process.env.MATOMO_SITE_ID,
      matomoUrl: process.env.MATOMO_IP,
      siteUrl: process.env.MATOMO_URL
      // dev: true
    }
  })
}
