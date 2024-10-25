const express = require('express');
const db = require('./database');
const cors = require('cors');
const { userRoutes } = require('./routers');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Home'));

app.use('/api', userRoutes);

(async () => {
    try {
        await db.getConnection();
        console.log('-----> Connected to database <-----');
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
})();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});