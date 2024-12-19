const express = require('express');
const router = express.Router();
const Joueur = require('../models/joueur');
const Equipe = require('../models/equipe');

// Interface Routes
router.get('/', async (req, res) => {
    try {
        const joueurs = await Joueur.find().populate('equipe');
        res.render('joueurs/index', { joueurs });
    } catch (error) {
        res.status(500).render('error', { 
            message: error.message,
            error: { status: 500 }
        });
    }
});

router.get('/create', async (req, res) => {
    try {
        const equipes = await Equipe.find();
        res.render('joueurs/create', { equipes });
    } catch (error) {
        res.status(500).render('error', { 
            message: error.message,
            error: { status: 500 }
        });
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.params.id);
        const equipes = await Equipe.find();
        
        if (!joueur) {
            return res.status(404).render('error', { 
                message: 'Joueur non trouvé',
                error: { status: 404 }
            });
        }
        
        res.render('joueurs/edit', { joueur, equipes });
    } catch (error) {
        res.status(500).render('error', { 
            message: error.message,
            error: { status: 500 }
        });
    }
});

// API Routes for CRUD operations
router.post('/api/create', async (req, res) => {
    try {
        const joueur = new Joueur({
            nom: req.body.nom,
            prenom: req.body.prenom,
            age: req.body.age,
            email: req.body.email,
            equipe: req.body.equipe
        });
        const newJoueur = await joueur.save();
        res.status(201).json({ 
            message: 'Joueur créé avec succès',
            joueur: newJoueur 
        });
    } catch (error) {
        res.status(400).json({ 
            message: error.message 
        });
    }
});

router.put('/api/update/:id', async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.params.id);
        if (!joueur) {
            return res.status(404).json({ message: 'Joueur non trouvé' });
        }

        joueur.nom = req.body.nom;
        joueur.prenom = req.body.prenom;
        joueur.age = req.body.age;
        joueur.email = req.body.email;
        joueur.equipe = req.body.equipe;

        const updatedJoueur = await joueur.save();
        res.json({ 
            message: 'Joueur mis à jour avec succès',
            joueur: updatedJoueur 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/api/delete/:id', async (req, res) => {
    try {
        const joueur = await Joueur.findById(req.params.id);
        if (!joueur) {
            return res.status(404).json({ message: 'Joueur non trouvé' });
        }
        await joueur.deleteOne();
        res.json({ message: 'Joueur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 