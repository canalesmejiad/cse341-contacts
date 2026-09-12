const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts');

router.get('/', (req, res) => {
    /*
      #swagger.tags = ['Contacts']
      #swagger.summary = 'Get all contacts'
      #swagger.description = 'Returns every contact stored in MongoDB.'
      #swagger.responses[200] = {
        description: 'Contacts retrieved successfully.',
        schema: [{ $ref: '#/definitions/Contact' }]
      }
      #swagger.responses[500] = { description: 'Internal server error.' }
    */
    return contacts.getAll(req, res);
});

router.get('/:id', (req, res) => {
    /*
      #swagger.tags = ['Contacts']
      #swagger.summary = 'Get one contact'
      #swagger.description = 'Returns one contact using its MongoDB ID.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ID of the contact',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: 'Contact retrieved successfully.',
        schema: { $ref: '#/definitions/Contact' }
      }
      #swagger.responses[400] = { description: 'Invalid contact ID.' }
      #swagger.responses[404] = { description: 'Contact not found.' }
      #swagger.responses[500] = { description: 'Internal server error.' }
    */
    return contacts.getOne(req, res);
});

router.post('/', (req, res) => {
    /*
      #swagger.tags = ['Contacts']
      #swagger.summary = 'Create a contact'
      #swagger.description = 'Creates a new contact in MongoDB. All fields are required.'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Contact information',
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
      }
      #swagger.responses[201] = {
        description: 'Contact created successfully.',
        schema: { id: '6aa4bceaf5f8fef71b9316b5' }
      }
      #swagger.responses[400] = { description: 'Missing or invalid fields.' }
      #swagger.responses[500] = { description: 'Internal server error.' }
    */
    return contacts.createContact(req, res);
});

router.put('/:id', (req, res) => {
    /*
      #swagger.tags = ['Contacts']
      #swagger.summary = 'Update a contact'
      #swagger.description = 'Updates an existing contact using its MongoDB ID. All fields are required.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ID of the contact',
        required: true,
        type: 'string'
      }
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated contact information',
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
      }
      #swagger.responses[204] = { description: 'Contact updated successfully.' }
      #swagger.responses[400] = { description: 'Invalid ID or missing fields.' }
      #swagger.responses[404] = { description: 'Contact not found.' }
      #swagger.responses[500] = { description: 'Internal server error.' }
    */
    return contacts.updateContact(req, res);
});

router.delete('/:id', (req, res) => {
    /*
      #swagger.tags = ['Contacts']
      #swagger.summary = 'Delete a contact'
      #swagger.description = 'Deletes an existing contact using its MongoDB ID.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ID of the contact',
        required: true,
        type: 'string'
      }
      #swagger.responses[204] = { description: 'Contact deleted successfully.' }
      #swagger.responses[400] = { description: 'Invalid contact ID.' }
      #swagger.responses[404] = { description: 'Contact not found.' }
      #swagger.responses[500] = { description: 'Internal server error.' }
    */
    return contacts.deleteContact(req, res);
});

module.exports = router;
