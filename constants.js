// const VALID_ROLES = [
//   "TOP",
//   "TOPLANER",
//   "JUNGLE",
//   "JG",
//   "JUNGLER",
//   "MID",
//   "MIDDLE",
//   "MIDLANE",
//   "MIDLANER",
//   "BOTTOM",
//   "BOT",
//   "ADC",
//   "AD CARRY",
//   "ADC",
//   "SUPPORT",
//   "SUPP",
//   "ALL",
//   "EVERYTHING",
// ];

// const TEAM_MAP = {
//   LE: "La Espada",
//   RV: "Royal Vagabonds",
//   INT: "Im Not Trying",
//   UPS: "United Parcel Service",
//   DBZ: "DaBabieZ",
//   BFC: "BaeDcarry Fan Club",
//   TI: "Third Impact",
//   IGN: "Ignition",
//   OTS: "On The Spot",
//   HOT: "Hot Take",
//   "La Espada": "La Espada",
//   "Royal Vagabonds": "Royal Vagabonds",
//   "Im Not Trying": "Im Not Trying",
//   "United Parcel Service": "United Parcel Service",
//   "DaBabieZ": "DaBabieZ",
//   "BaeDcarry Fan Club": "BaeDcarry Fan Club",
//   "Third Impact": "Third Impact",
//   "Ignition": "Ignition",
//   "On The Spot": "On The Spot",
//   "Hot Take": "Hot Take",
// };

// const TEAM_MAP_10 = {
//   LE: "La Espada",
//   RV: "Royal Vagabonds",
//   INT: "Im Not Trying",
//   UPS: "United Parcel Service",
//   DBZ: "DaBabieZ",
//   BFC: "BaeDcarry Fan Club",
//   TI: "Third Impact",
//   IGN: "Ignition",
//   OTS: "On The Spot",
//   HOT: "Hot Take",
// };

// const ROLE_MAP = {
//   TOP: "TOP",
//   TOPLANER: "TOP",
//   JUNGLE: "JUNGLE",
//   JG: "JUNGLE",
//   JUNGLER: "JUNGLE",
//   MID: "MIDDLE",
//   MIDDLE: "MIDDLE",
//   MIDLANE: "MIDDLE",
//   MIDLANER: "MIDDLE",
//   BOTTOM: "BOTTOM",
//   BOT: "BOTTOM",
//   ADC: "BOTTOM",
//   "AD CARRY": "BOTTOM",
//   ADC: "BOTTOM",
//   SUPPORT: "SUPPORT",
//   SUPP: "SUPPORT",
//   ALL: "ALL",
//   EVERYTHING: "ALL",
// };

const HELP_MSG =
  "The following commands are available: \n \n" +
  "*!draftlol [team1 team2] [ban1 ban2]*: Returns draftlol links for specified teams/bans. \n" +
  "*!prodraft [team1 team2]*: Returns prodraft links for specified teams. \n" +
  "*!help*: Displays this help message. \n \n" +
  "Demacia is developed and maintained by thisenemy#8502.";

const PREFIX = ".";

const SIGNUPS = {
  "PLAYER": "",
  "CAPTAIN": ""
}
const RULES = ""

module.exports = Object.freeze({
  // VALID_ROLES: VALID_ROLES,
  // ROLE_MAP: ROLE_MAP,
  PREFIX: PREFIX,
  HELP_MSG: HELP_MSG,
  // TEAM_MAP: TEAM_MAP,
  // TEAM_MAP_10: TEAM_MAP_10,
  // TW_IMG1: TW_IMG1,
  // TW_IMG2: TW_IMG2,
  // TW_URL: TW_URL,
  SIGNUPS: SIGNUPS,
  RULES: RULES
});
