const gulp = require('gulp');

require('./gulp/dev.js');
require('./gulp/docs.js');

// dev
gulp.task(
    'default',
    gulp.series(
        'clean:dev',
        gulp.parallel(
            'html:dev',
            'css:dev',
            'images:dev',
            'fonts:dev',
            'js:dev'
        ),
        gulp.parallel('server:dev', 'watch:dev')
    )
);

// prod
gulp.task(
    'docs',
    gulp.series(
        'clean:docs',
        gulp.parallel(
            'html:docs',
            'css:docs',
            'images:docs',
            'fonts:docs',
            'js:docs'
        ),
        gulp.parallel('server:docs')
    )
);
