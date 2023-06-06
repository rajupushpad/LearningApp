const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'next1',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          next2: `next2@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        exposes: {
          './CusButton': './components/CusButton.tsx',
          './InputField': './components/InputField.tsx',
          './EmptyContainer': './components/EmptyContainer',
          './ErrorLoaderContainer': './components/ErrorLoaderContainer',
          './ProcessCompleteAlert': './components/ProcessCompleteAlert',
          './ModalComponent': './components/Modal/ModalComponent.tsx',
          './EditIcon': './asset/EditIcon.tsx',
          './DeleteIcon': './asset/DeleteIcon.tsx',
        },
        shared: {
          'bootstrap': {
            singleton: true
          },
        }
      })
    );

    return config;
  },
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
  },
};
