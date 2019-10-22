module.exports = {
    modify: (config, { target, dev }, webpack) => {
      if (target === "node") {
        config.externals = []
      }
      return config;
    },
  };