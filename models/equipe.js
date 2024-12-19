const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
    nomEquipe: {
        type: String,
        required: [true, 'Nom équipe est obligatoire']
    },
    ville: String,
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Equipe', equipeSchema); 