const cors = require('cors');
const express = require('express');
const app = express();
const commentRoutes = require('./routers/commentRoutes');
const nestedCommentRoutes = require('./routers/nestedCommentsRoutes');
const sequelize = require('./database'); 
const NestedComment = require('./models/nestedCommentsModel');

app.use(express.json());
app.use(cors());
app.use('/api', commentRoutes);
app.use('/api', nestedCommentRoutes);

sequelize.sync()
    .then(async () => {
        console.log('Database & tables created!');
        await sequelize.queryInterface.removeConstraint('NestedComments', 'fk_parent_comment_id');
        await sequelize.queryInterface.addConstraint('NestedComments', {
            fields: ['parent_comment_id'],
            type: 'foreign key',
            name: 'fk_parent_comment_id',
            references: {
                table: 'NestedComments',
                field: 'id'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
        console.log('Foreign key constraint added.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});