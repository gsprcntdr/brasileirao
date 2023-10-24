const express = require("express");
const getPlayers = require("./controllers/players");
const getTeams = require("./controllers/teams");
const squadFromYear = require("./controllers/squadFromYear");
const { getTeamHistory, getPlayerHistory } = require("./controllers/history");
const router = express();

router.get("/players", getPlayers);
router.get("/teams", getTeams);
router.get("/squad", squadFromYear);
router.get("/team-history", getTeamHistory);
router.get("/player-history", getPlayerHistory);

module.exports = router;
