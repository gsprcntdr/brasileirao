const express = require("express");
const getPlayers = require("./controllers/players");
const getTeams = require("./controllers/teams");
const squadFromYear = require("./controllers/squadFromYear");
const { getTeamHistory, getPlayerHistory } = require("./controllers/history");
const router = express();

router.get("/jogadores", getPlayers);
router.get("/times", getTeams);
router.get("/equipe", squadFromYear);
router.get("/historico-time", getTeamHistory);
router.get("/historico-jogador", getPlayerHistory);

module.exports = router;
