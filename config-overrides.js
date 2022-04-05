/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
const { override, fixBabelImports,addDecoratorsLegacy } = require('customize-cra');
const rewireTypescript = require('react-app-rewire-typescript');

module.exports = {
  webpack: override(config => {
    // 先找到oneOf下面所有的loader
    const oneOfLoaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    // 一定要放到oneOf的最前面，否则没有效果，详细可以查看oneOf的具体作用
    // 不放到最前面的话，就会当作media处理，输出的media下面的文件
    oneOfLoaders.unshift({
      test: /.md$/,
      use: [{
        loader: 'html-loader',
      }]
    },
      {
        test:/\.tsx?$|\.ts?$/,
        use: [{
          loader: 'ts-loader',
        }]
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: '@mdx-js/loader',
          }
        ]
      },
    );

    return config;
  })
};