/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    output: 'standalone',
    images: {
      // domains: ['gw.alipayobjects.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'mdn.alipayobjects.com',
          port: '',
          pathname: '/huamei_22khvb/afts/img/**',
        },
      ],
    },
    // webpack: (config, { isServer }) => {
    //   if (!isServer) {
    //     // 使用动态 import 替换 require
    //     (async () => {
    //       const { default: babelPluginImport } = await import('babel-plugin-import');
    //       config.plugins.push(
    //         new babelPluginImport({
    //           libraryName: 'antd',
    //           style: true,
    //         })
    //       );
    //     })();
    //   }
    //   return config;
    // },
  };
  
  export default nextConfig;
  