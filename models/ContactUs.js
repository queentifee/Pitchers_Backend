const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    project_description: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('ContactUs', contactUsSchema);
