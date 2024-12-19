const Joueur = require('../models/joueur');

async function validateTeamDelete(req, res, next) {
    try {
        const teamId = req.params.id;
        console.log('Checking team:', teamId);
        
        const playersCount = await Joueur.countDocuments({ equipe: teamId });
        console.log('Players in team:', playersCount);
        
        if (playersCount > 0) {
            console.log('Deletion blocked: Team has players');
            return res.status(400).json({
                status: 'error',
                message: 'Cette equipe a des joueurs.'
            });
        }
        
        console.log('Team can be deleted - no players found');
        next();
    } catch (error) {
        console.error('Error in validateTeamDelete:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error checking team players'
        });
    }
}

module.exports = validateTeamDelete;
