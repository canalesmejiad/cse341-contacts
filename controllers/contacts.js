const { ObjectId } = require('mongodb');
const mongodb = require('../database/connection');

const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'birthday',
];

const getMissingFields = (body) => {
    return requiredFields.filter((field) => {
        return typeof body[field] !== 'string' || body[field].trim() === '';
    });
};

const getContactData = (body) => {
    return {
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim(),
        favoriteColor: body.favoriteColor.trim(),
        birthday: body.birthday.trim(),
    };
};

// Get all contacts
const getAll = async (req, res) => {
    try {
        const contacts = await mongodb
            .getDb()
            .collection('contacts')
            .find()
            .toArray();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while retrieving contacts.',
        });
    }
};

// Get one contact
const getOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid contact ID.',
        });
    }

    try {
        const contact = await mongodb
            .getDb()
            .collection('contacts')
            .findOne({ _id: new ObjectId(req.params.id) });

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found.',
            });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while retrieving the contact.',
        });
    }
};

// Create a contact
const createContact = async (req, res) => {
    const missingFields = getMissingFields(req.body);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing or invalid fields: ${missingFields.join(', ')}`,
        });
    }

    try {
        const contact = getContactData(req.body);
        const result = await mongodb
            .getDb()
            .collection('contacts')
            .insertOne(contact);

        res.status(201).json({
            id: result.insertedId,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while creating the contact.',
        });
    }
};

// Update a contact
const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid contact ID.',
        });
    }

    const missingFields = getMissingFields(req.body);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing or invalid fields: ${missingFields.join(', ')}`,
        });
    }

    try {
        const contact = getContactData(req.body);
        const result = await mongodb
            .getDb()
            .collection('contacts')
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: contact }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Contact not found.',
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while updating the contact.',
        });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid contact ID.',
        });
    }

    try {
        const result = await mongodb
            .getDb()
            .collection('contacts')
            .deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Contact not found.',
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Some error occurred while deleting the contact.',
        });
    }
};

module.exports = {
    getAll,
    getOne,
    createContact,
    updateContact,
    deleteContact,
};
