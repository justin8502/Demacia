const puppeteer = require("puppeteer");

// Delay Function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

configs = {
  BLUE_5_RED_5: "https://draftlol.dawe.gg?opts=InAiOjQ1LCJiIjo0NQ",
  BLUE_5_RED_3:
    "https://draftlol.dawe.gg?opts=InQiOlsxMiwxNF0sInAiOjQ1LCJiIjo0NQ",
  BLUE_5_RED_0:
    "https://draftlol.dawe.gg?opts=InQiOlsxLDMsNSwxMiwxNF0sInAiOjQ1LCJiIjo0NQ",
  BLUE_3_RED_5:
    "https://draftlol.dawe.gg?opts=InQiOlsxMywxNV0sInAiOjQ1LCJiIjo0NQ",
  BLUE_3_RED_3:
    "https://draftlol.dawe.gg?opts=InQiOlsxMywxNSwxMiwxNF0sInAiOjQ1LCJiIjo0NQ",
  BLUE_3_RED_0:
    "https://draftlol.dawe.gg?opts=InQiOlsxMywxNSwxLDMsNSwxMiwxNF0sInAiOjQ1LCJiIjo0NQ",
  BLUE_0_RED_5:
    "https://draftlol.dawe.gg?opts=InQiOlswLDIsNCwxMywxNV0sInAiOjQ1LCJiIjo0NQ",
  BLUE_0_RED_3:
    "https://draftlol.dawe.gg?opts=InQiOlswLDIsNCwxMywxNSwxMiwxNF0sInAiOjQ1LCJiIjo0NQ",
  BLUE_0_RED_0:
    "https://draftlol.dawe.gg?opts=InQiOlswLDIsNCwxMywxNSwxLDMsNSwxMiwxNF0sInAiOjQ1LCJiIjo0NQ",
};

function getConfigKey(blueBanCount, redBanCount) {
    return `BLUE_${blueBanCount}_RED_${redBanCount}`;
}

/**
 * Generates a draft and
 * @param {string} team1 : Team 1 name
 * @param {string} team2 : Team 2 name
 * @param {int} blueBanCount : Number of bans blue is allowed
 * @param {int} redBanCount : Number of bans red is allowed
 *
 * @returns {string} The match data generated (for use in discord)
 */
async function generateDraftLOL(team1, team2, blueBanCount, redBanCount) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  url = configs[getConfigKey(blueBanCount, redBanCount)];

  await page.goto(url);

  await delay(1000);
  await page.type(".inputBlue", team1, { delay: 50 });
  await page.type(".inputRed", team2, { delay: 50 });
  await page.click(".sendButton", { delay: 50 });

  await delay(500);

  let link_elems = await page.$$("input");
  let links = await Promise.all(link_elems.map((cur) => page.evaluate((el) => el.value, cur)));
  let res = `${team1} Captain: ${links[0]}\n${team2} Captain: ${links[1]}\nSpectator Link: ${links[2]}`;

  browser.close();

  return res;
}

/**
 * Generates a draft and
 * @param {string} team1 : Team 1 name
 * @param {string} team2 : Team 2 name
 *
 * @returns {string} The match data generated (for use in discord)
 */
async function generateProDraft(team1, team2) {
  let MN = team1 + 'VS' + team2
  const browser = await puppeteer.launch({
    headless: true,
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto('http://prodraft.leagueoflegends.com/');
  await page.type('#blue_team_name', team1)
  await page.type('#red_team_name', team2)
  await page.type('#match_name', MN)
  await page.click('#root > div > div > button');
  await delay(1000);
  
  let blue = await page.$('#blue_team_name')
  let red = await page.$('#red_team_name')
  let match = await page.$('#match_name')

  let blueTeam = await page.evaluate(el => el.value, blue)
  let redTeam = await page.evaluate(el => el.value, red)
  let matchTeam = await page.evaluate(el => el.value, match)

  browser.close();
  resp =`${team1} Captain: ${blueTeam}\n${team2} Captain: ${redTeam}\nSpectator Link: ${matchTeam}`;

  return resp;
}

exports.generateDraftLOL = generateDraftLOL;
exports.generateProDraft = generateProDraft;