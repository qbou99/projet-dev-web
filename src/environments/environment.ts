export const environment = {
  production: false,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '3000',
    endpoints: {
      articleAleatoire: '/api/article/random',
      tousLesArticles: '/api/article',
      unArticle: '/api/article/:id',
      filterByName: '/api/article/name/:name'
    }
  }
};
