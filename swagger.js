const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description:
            'API documentation for creating, reading, updating, and deleting contacts.',
    },
    basePath: '/contacts',
    definitions: {
        Contact: {
            _id: '6aa4bceaf5f8fef71b9316b5',
            firstName: 'David',
            lastName: 'Canales',
            email: 'david@example.com',
            favoriteColor: 'Blue',
            birthday: 'January 1, 2000',
        },
        ContactInput: {
            firstName: 'David',
            lastName: 'Canales',
            email: 'david@example.com',
            favoriteColor: 'Blue',
            birthday: 'January 1, 2000',
        },
    },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);