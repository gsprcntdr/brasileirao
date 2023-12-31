const knex = require("../connection");

async function getTeamHistory(req, res) {
  let { nome } = req.query;
  if (nome === undefined) {
    return res
      .status(400)
      .json("Necessário nome do time: /historico-time?nome=[name name]");
  }
  if (nome.indexOf(" ") !== -1) {
    nome = nome.replaceAll(" ", "%");
  }
  try {
    const rawExp = `
    select
    distinct players.name as pname, t.name as tname, players.id as pid, r.year
    from players join relations r
    on r.player_id = players.id
    join teams t on r.team_id = t.id
    where t.name ilike '${nome}%'
    `;
    const { rows } = await knex.raw(rawExp);

    const teamCounts = rows.reduce((acc, item) => {
      acc[item.tname] = (acc[item.tname] || 0) + 1;
      return acc;
    }, {});

    const teams = Object.keys(teamCounts);

    if (teams.length > 1) {
      return res.status(400).json("Mais de um encontrado");
    } else if (teams.length === 0) {
      return res.status(400).json("Nenhum encontrado");
    }

    const format = {
      name: teams[0],
      2020: [],
      2021: [],
      2022: [],
      2023: [],
    };

    const years = Object.keys(format);
    years.pop();

    for (let player of rows) {
      for (let year of years) {
        if (player.year == year) {
          format[year].push(player.pname);
          break;
        }
      }
    }
    return res.status(200).json(format);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

async function getPlayerHistory(req, res) {
  let { nome } = req.query;
  if (nome === undefined) {
    return res
      .status(400)
      .json(
        "Necessário nome do jogador: /historico-jogador?nome=[name last name]"
      );
  }
  if (nome.indexOf(" ") !== -1) {
    nome = nome.replaceAll(" ", "%");
  }
  try {
    const rawExp = `
        select
        distinct players.id as pid, players.name as pname, teams.name as tname, teams.id as tid, players.link, r.year
        from players join relations r
        on r.player_id = players.id
        join teams on r.team_id = teams.id
        where players.name ilike '${nome}%';`;

    const { rows } = await knex.raw(rawExp);

    const idCounts = rows.reduce((acc, item) => {
      acc[item.pid] = (acc[item.pid] || 0) + 1;
      return acc;
    }, {});

    const ids = Object.keys(idCounts);

    if (ids.length > 1) {
      return res.status(400).json("Mais de um encontrado");
    } else if (ids.length === 0) {
      return res.status(400).json("Nenhum encontrado");
    }

    const format = {
      name: rows[0].pname,
      2020: [],
      2021: [],
      2022: [],
      2023: [],
    };

    const years = Object.keys(format);
    years.pop();

    for (let team of rows) {
      for (let year of years) {
        if (team.year == year) {
          format[year].push(team.tname);
        }
      }
    }

    return res.status(200).json(format);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

module.exports = { getTeamHistory, getPlayerHistory };
