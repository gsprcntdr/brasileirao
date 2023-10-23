const knex = require("../connection");

async function getTeams(req, res) {
  try {
    const teams = await knex("teams").select("*");
    const formatted = teams.map((team) => {
      return {
        id: team.id,
        name: team.name.slice(0, team.name.length - 3),
        state: team.state,
      };
    });
    return res.status(200).json(formatted);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

module.exports = getTeams;
