import app from './src/app.js'
import createDb from './db/db.js';

createDb();

app.listen(3000, () => {
    console.log("Server is running successfully");
})