const knex = require("../connection");

async function squadFromYear(req, res) {
  const { team, year } = req.query;
  const rawExp = `select
        distinct players.name, players.birthday, players.link
        from players join relations r
        on r.player_id = players.id
        join teams t on r.team_id = t.id
        where t.name ilike '%${team}%' and r.year = ${year};`;
  try {
    const selection = await knex.raw(rawExp);
    return res.status(200).json(selection.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

module.exports = squadFromYear;
