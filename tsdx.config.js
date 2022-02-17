const typescript = require('rollup-plugin-typescript2');
module.exports = {
    rollup: function (config, options) {
        // 测试环境环境去掉 减少体积
        if (process.env.NODE_ENV?.trim() !== "test") {
            // 去掉sourcemap 减少体积
            config.output = {
                file: 'dist/index.js',
                format: 'cjs',
                freeze: false,
                esModule: true,
                name: '@gaopeng123/rtc-cli',
                sourcemap: false,
                globals: {react: 'React', 'react-native': 'ReactNative'},
                exports: 'named'
            }
        }
        config.plugins[5] = typescript({
            tsconfigOverride: {
                compilerOptions: {declaration: false, importHelpers: false}
            }
        });
        return config
    }
}

