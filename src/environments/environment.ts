export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      tousLesArticles: '/api/article',
      unArticle: '/api/article/:id',
      filterByName: '/api/article/name/:name'
    }
  }
};
