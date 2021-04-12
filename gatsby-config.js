module.exports = {
  siteMetadata: {
    title: 'Dart vador',
    author: 'sinsedrix',
    description: 'A dart counter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Dart Vader',
        short_name: 'dart-vader',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/dart-vador-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
  ],
}
