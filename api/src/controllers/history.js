const knex = require("../connection");

async function getHistory(req, res) {
  const { team } = req.query;
  try {
    const rawExp = `
    select
    distinct players.name, players.birthday, r.year
    from players join relations r
    on r.player_id = players.id
    join teams t on r.team_id = t.id
    where t.name ilike '%${team}%'
    `;
    const selection = await knex.raw(rawExp);
    return res.status(200).json(selection.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

module.exports = getHistory;
