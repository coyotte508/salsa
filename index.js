const Nightmare = require('nightmare');   
const assert = require('assert');
const prompt = require('prompt-promise');
var browser = Nightmare({ show: true });

async function run() {
  try {
    console.log("Connexion à la page de test...");
    await browser.goto('http://novelupdates.com');

    if (await browser.exists('.newfrmposts')) {
      console.log("Déjà connecté à internet");
      await browser.end();
      return;
    }

    console.log("connecté!");

    //assert(await browser.exists('input[name="username"]'), "Pas d'endroit où mettre le login");

    let username = await prompt("username: ");
    await browser.type('input[name="username"]', username);

    let password = await prompt.password("password: ");
    await browser.type('input[name="password"]', password);


    await browser.evaluate(() => submitAction());

    console.log ("Submit effectué!");

    await browser.end();

  } catch(err) {
    console.error(err);
  }
}

run();