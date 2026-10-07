module.exports = {
  apps: [
    {
      name: 'aptitude-prep-api',
      script: 'server/local-api.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
