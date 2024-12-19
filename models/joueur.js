const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Nom est obligatoire']
    },
    prenom: String,
    age: Number,
    email: {
        type: String,
        required: [true, 'Email est obligatoire'],
        unique: true
    },
    equipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipe'
    }
});

module.exports = mongoose.model('Joueur', joueurSchema); 