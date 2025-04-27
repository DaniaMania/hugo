module.exports = function override(config, env) {
    config.resolve.fallback = {
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "assert": require.resolve("assert/"),
        "util": require.resolve("util/"),
        "zlib": require.resolve("browserify-zlib")
    };
    return config;
} 