module.exports = {
  siteMetadata: {
    title: "ninety-nine days"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-favicon",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "images"
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        stylesPath: `${__dirname}/src/styles/base.scss`
      }
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `sahjackson`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-77015609-4",
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true
      }
    },
    "gatsby-plugin-netlify-cache",
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
