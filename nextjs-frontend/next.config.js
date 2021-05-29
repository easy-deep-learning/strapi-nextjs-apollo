module.exports = {
  future: {
    webpack5: true,
  },
  async rewrites () {
    return {
      fallback: [
        {
          source: '/graphql',
          destination: process.env.STRAPI_GRAPHQL_API_URI,
        },
      ],
    }
  },
}
