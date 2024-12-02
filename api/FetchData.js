const Game = require('../models/games')
module.exports = async (req, res) => {
    try {
      const games = await Game.find();
      const formattedGames = games.map(({ number,candidate,name,image, votecount , BL }) => ({number,candidate,name,image, votecount , BL }));
      res.json(formattedGames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }