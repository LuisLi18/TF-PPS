module.exports = {
    type: 'mysql',
    url: process.env.TRABAJO_FINAL_PATRONES,
    migrationsRun: true,
    logging: true,
    timezone: '+0',
    entities: [getEntityDirectory()],
    migrations: [getMigrationDirectory()],
    cli: {
        migrationsDir: 'src/migrations',
    },
};

function getEntityDirectory() {
    let path = 'dist/src/**/infrastructure/typeorm/schemas/*.js';
    if (process.env.NODE_ENV === 'migration') {
        path = 'src/**/infrastructure/typeorm/schemas/*.ts';
    }
    return path;
}

function getMigrationDirectory() {
    let path = 'dist/src/migrations/*.js';
    if (process.env.NODE_ENV === 'migration') {
        path = 'src/migrations/*.ts';
    }
    return path;
}
