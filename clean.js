const del = require('del');

function clean() {
    return del([
        '**/*.js',
        '**/*.js.*',
        '*.tsbuildinfo',
        '!node_modules',
        '!clean.js',
        '!spec/support/specs.js',
        'generated-assets/**/*.*'
    ]);
}

clean();
