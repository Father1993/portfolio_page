const config = {
    mode: 'production',
    entry: {
        main: './src/js/main.js',
        main_en: './src/js/main_en.js',
    },
    output: {
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

module.exports = config;
