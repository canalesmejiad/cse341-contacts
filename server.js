const express = require('express');
const mongodb = require('./database/connection');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

mongodb.initDb((error) => {
    if (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});