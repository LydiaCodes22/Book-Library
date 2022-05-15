const app = require('./src/app');
const APP_PORT = process.env.DB_PORT || 4000;
app.listen(3306, () => {
    console.log(`App is listening on port ${APP_PORT}`);
});