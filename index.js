const cors = require('cors');
const express = require('express');
const app = express();
const commentRoutes = require('./routers/commentRoutes');
const sequelize = require('./database'); 

app.use(express.json());
app.use(cors());
app.use('/api', commentRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});