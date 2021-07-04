// IMPORTS
const axios = require("axios");
const Discord = require("discord.js");
const dotenv = require('dotenv');
// const { GoogleSpreadsheet } = require("google-spreadsheet");

// PROJECT IMPORTS
// const creds = require("./client_secret.json");
// const config = require("./config.json");
const constants = require("./constants");
const draft = require("./drafting-utils");

dotenv.config();
const client = new Discord.Client();

// Using battlefy api endpoint
const tournamentApi = axios.create({
  baseURL: "https://dtmwra1jsgyb0.cloudfront.net/"
});

let isActive = false;

client.on("message", async function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(constants.PREFIX)) return;

  const commandBody = message.content.slice(constants.PREFIX.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  let resp, selector, team1, team2;

  // Command handler
  switch (command) {
    case "help":
      message.channel.send(constants.HELP_MSG);
      break;
    // case "mh":
    //   resp = "";
    //   if (args[0] === undefined) {
    //     return;
    //   }
    //   selector = args[0];
    //   if (Object.keys(constants.TEAM_MAP).includes(selector)) {
    //     let translated = constants.TEAM_MAP[selector];
    //     let res = await getTournamentStageMatches("605ecea334f4d511922a813c");
    //     resp +=
    //       "Pulling match history for " +
    //       translated +
    //       " : \n" +
    //       "##################################### \n";
    //     resp +=
    //       "W: " +
    //       res[translated][0].length +
    //       " L: " +
    //       res[translated][1].length +
    //       "\n";
    //     for (let i = 0; i < res[translated][0].length; i++) {
    //       resp += res[translated][0][i] + " **Win** \n";
    //     }
    //     resp += "------------------------------------- \n";
    //     for (let i = 0; i < res[translated][1].length; i++) {
    //       resp += res[translated][1][i] + " **Loss** \n";
    //     }
    //   } else {
    //     resp = "Not a valid argument. Format is as follows: !mh [TEAM]. ";
    //   }
    //   message.channel.send(resp);
    //   break;
    case "draftlol":
      if (args.length <= 1) {
        return;
      }
      team1 = args[0];
      team2 = args[1];
      let blueBanCount = (args[2] ? args[2] : 5);
      let redBanCount = (args[3] ? args[3] : 5);

      resp = await draft.generateDraftLOL(team1, team2, blueBanCount, redBanCount);
      message.channel.send(resp);
      break;
    case "prodraft":
      if (args.length <= 1) {
        return;
      }
      team1 = args[0];
      team2 = args[1];

      resp = await draft.generateProDraft(team1, team2);
      message.channel.send(resp);
      break;
    // case "league-rules":
    //   message.channel.send("Rules: " + constants.RULES);
    //   break;
    // case "league-signup":
    //   message.channel.send("Players: " + constants.SIGNUPS.PLAYER);
    //   message.channel.send("Captains: " + constants.SIGNUPS.CAPTAIN);
    //   break;
    // case "standings":
    //   let res = await getTournamentStageMatches("");
    //   let sorted = Object.keys(res).map(function(key) {
    //     return [key, [res[key][0].length, res[key][1].length]];
    //   });
    //   // console.log(sorted);
    //   // First = Wins, Second = Losses
    //   // Sort first based on wins, second on who has lost more
    //   sorted.sort(function(first, second) {
    //     if (first[1][0] === second[1][0]) {
    //       return first[1][1] - second[1][1];
    //     } else {
    //       return second[1][0] - first[1][0];
    //     }
    //   });
    //   // console.log(sorted);
    //   let standings = "Here are the current standings: \n \n";
    //   for (item in sorted) {
    //     standings +=
    //       "*" +
    //       (parseInt(item) + 1).toString() +
    //       ": " +
    //       sorted[item][0] +
    //       "* (W: " +
    //       sorted[item][1][0] +
    //       " L: " +
    //       sorted[item][1][1] +
    //       ")\n";
    //   }
    //   message.channel.send(standings);
    //   break;
    default:
      // message.channel.send("Not a valid command. Type !ff for help. ");
      break;
  }
});

client.login(process.env.DISCORD_TOKEN);

async function getTournamentStageMatches(stage) {
  const response = await tournamentApi.get(`stages/${stage}/matches`);
  let teams = {
    // "Rubber Ducky Team": [[], []],
    // "Luck of the Draw": [[], []],
    // "ULTIMATE DAN": [[], []],
    // "On the Spot": [[], []],
    // "Mailbox's Angels": [[], []],
    // "BaeDCarry Fan Club": [[], []],
    // "Natural Big Boys Club": [[], []],
    // "Frank n' Beans": [[], []],
    // "LAMAR JACKSON FAN CLUB": [[], []],
    // "Big Shmeat Gang": [[], []]
  };
  Object.values(constants.TEAM_MAP_10).forEach(key => {
    teams[key.toString()] = [[], []]
  })
  for (match in response.data) {
    var winner;
    if (response.data[match].top.winner === true) {
      winner = "top";
      teams[response.data[match].top.team.name][0].push(
        response.data[match].bottom.team.name
      );
      teams[response.data[match].bottom.team.name][1].push(
        response.data[match].top.team.name
      );
    } else if (response.data[match].top.winner === false) {
      winner = "bottom";
      teams[response.data[match].top.team.name][1].push(
        response.data[match].bottom.team.name
      );
      teams[response.data[match].bottom.team.name][0].push(
        response.data[match].top.team.name
      );
    } else {
      winner = "undefined";
    }
    response.data[match].winner = winner;
  }
  return teams;
}
