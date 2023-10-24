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
        distinct players.name, players.birthday, players.link, t.id
        from players join relations r
        on r.player_id = players.id
        join teams t on r.team_id = t.id
        where t.name ilike '${nome}%' and r.year = ${ano};`;
  try {
    const { rows } = await knex.raw(rawExp);

    const teamCounts = rows.reduce((acc, item) => {
      acc[item.id] = (acc[item.id] || 0) + 1;
      return acc;
    }, {});

    const teams = Object.keys(teamCounts);

    if (teams.length > 1) {
      return res.status(400).json("Mais de um encontrado");
    } else if (teams.length === 0) {
      return res.status(400).json("Nenhum encontrado");
    }

    const format = rows.map((player) => {
      return {
        name: player.name,
        birthday: player.birthday,
        link: player.link,
      };
    });

    return res.status(200).json(format);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

module.exports = squadFromYear;
