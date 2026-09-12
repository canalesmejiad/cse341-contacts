const express = require('express');
const mongodb = require('./database/connection');
const contactsRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
        console.log(`Swagger documentation: http://localhost:${port}/api-docs`);
    });
});
