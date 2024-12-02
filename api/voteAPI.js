const Game = require('../models/games');  // Import your Game model
const User = require('../models/vote');  // Import your User model
const axios = require('axios');
const webhookUrl = 'https://discord.com/api/webhooks/1202641594382032896/LWc9E5WX-N1-D6zyRupihCErupP1C6zPcN1RaKABXAmSbZmDqlf752DTpd9XQE2AqXVW';

module.exports = async (req, res) => {
    const { game_name } = req.query;
    const userID = req.session.studentid;

    if (!game_name || !userID) {
        const Errors = "Code 304 too fast please contact staff !";
        req.flash('danger', Errors);
        return res.redirect('/');
    }

    try {
        const user = await User.findOne({ studentid: userID });

        if (!user) { return res.status(404).json({ error: 'User not found' });}
        if (user.vote !== 'No') { 
            const Errors = "This USER Already VOTE";
            req.flash('danger', Errors);
            return res.redirect('/');
        }
        const game = await Game.findOne({ candidate: game_name });
        if (!game) {return res.status(404).json({ error: 'Game not found' });}
        const numericVoteCount = parseInt(game.votecount, 10);
        const updatedGame = await Game.findOneAndUpdate(
            { candidate: game_name },
            { $set: { votecount: numericVoteCount + 1 } },
            { new: true }
        );
        await User.findOneAndUpdate(
            { studentid: userID },
            { vote: 'Yes' },
            { new: true }
        );

          console.log('Vote counted for :', game_name, 'by user ID:', userID);
          const embed = {
            title: 'VOTE TUN ALERT',
            description: 'notification for vote',
            color: 0x00ff00,
            fields: [{ name: 'student id', value: userID, inline: true }, { name: 'Vote counted for', value: game_name, inline: true }],
            footer: { text: 'powered by mecode !' },
            timestamp: new Date().toISOString(),
          };
          
          axios.post(webhookUrl, { content: '.', embeds: [embed] })
            .then(response => console.log('Webhook sent successfully:', response.data))
            .catch(error => console.error('Error sending webhook:', error));
          const Errors = "Success VOTE";
          req.flash('loginSuccess', Errors);
          delete req.session.studentid; // Move this line before the return statement
          return res.redirect('/');
    } catch (error) {
        console.error('Error counting vote:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};