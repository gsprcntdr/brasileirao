const knex = require("../connection");

async function getPlayers(req, res) {
  const { page } = req.query;
  try {
    if (!page) {
      const players = await knex("players").select("*");
      return res.status(200).json(players);
    }
    const offset = 50 * (page - 1);
    const players = await knex("players").select("*").limit(50).offset(offset);
    return res.status(200).json(players);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

module.exports = getPlayers;
