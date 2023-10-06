// module.exports = {
//   resolver: {
//     sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
//     assetExts: ['glb', 'gltf', 'png', 'jpg'],
//   },
// };

const { getDefaultConfig } = require('expo/metro-config');

module.exports = async () => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = getDefaultConfig(__dirname, {
    // Enable CSS support.
    isCSSEnabled: true,
  });

  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  });

  config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json', 'mjs'];
  config.resolver.assetExts = ['glb', 'gltf', 'png', 'jpg'];

  return config;
};
