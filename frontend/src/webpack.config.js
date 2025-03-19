module.exports = {
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        "buffer": require.resolve("buffer/"),
      },
    },
  };