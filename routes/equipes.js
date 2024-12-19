const express = require('express');
const router = express.Router();
const Equipe = require('../models/equipe');
const validateTeamDelete = require('../middleware/validateTeamDelete');

// Interface Routes
router.get('/', async (req, res) => {
    try {
        const equipes = await Equipe.find();
        res.render('equipes/index', { equipes });
    } catch (error) {
        res.status(500).render('error', { 
            message: error.message,
            error: { status: 500 }
        });
    }
});

router.get('/create', (req, res) => {
    res.render('equipes/create');
});

router.get('/edit/:id', async (req, res) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) {
            return res.status(404).render('error', { 
                message: 'Équipe non trouvée',
                error: { status: 404 }
            });
        }
        res.render('equipes/edit', { equipe });
    } catch (error) {
        res.status(500).render('error', { 
            message: error.message,
            error: { status: 500 }
        });
    }
});

// API Routes
router.get('/api/getAll', async (req, res) => {
    try {
        const equipes = await Equipe.find();
        res.json(equipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/api/create', async (req, res) => {
    try {
        const equipe = new Equipe({
            nomEquipe: req.body.nomEquipe,
            ville: req.body.ville,
            creationDate: req.body.creationDate
        });
        const newEquipe = await equipe.save();
        res.status(201).json({ 
            message: 'Équipe créée avec succès',
            equipe: newEquipe 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/api/update/:id', async (req, res) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }

        equipe.nomEquipe = req.body.nomEquipe;
        equipe.ville = req.body.ville;
        equipe.creationDate = req.body.creationDate;

        const updatedEquipe = await equipe.save();
        res.json({ 
            message: 'Équipe mise à jour avec succès',
            equipe: updatedEquipe 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/api/delete/:id', validateTeamDelete, async (req, res) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Équipe non trouvée' 
            });
        }
        
        await equipe.deleteOne();
        res.json({ 
            status: 'success',
            message: 'Équipe supprimée avec succès' 
        });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({ 
            status: 'error',
            message: error.message 
        });
    }
});

module.exports = router; 