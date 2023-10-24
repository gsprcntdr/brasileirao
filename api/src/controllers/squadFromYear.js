const knex = require("../connection");

async function squadFromYear(req, res) {
  const { nome, ano } = req.query;
  if (
    nome == undefined ||
    ano == undefined ||
    ano.trim() === "" ||
    nome.trim() === ""
  ) {
    return res
      .status(400)
      .json(
        "Necessário nome do time e ano: /equipe?nome=[nome nome]&ano=[ano]"
      );
  }
  const rawExp = `select
        distinct players.name, players.birthday, players.link
        from players join relations r
        on r.player_id = players.id
        join teams t on r.team_id = t.id
        where t.name ilike '%${nome}%' and r.year = ${ano};`;
  try {
    const selection = await knex.raw(rawExp);
    return res.status(200).json(selection.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

module.exports = squadFromYear;
