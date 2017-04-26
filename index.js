const Nightmare = require('nightmare');   
const assert = require('assert');
const prompt = require('prompt-promise');
var browser = Nightmare({ show: true });

async function run() {
  try {
    await browser.goto('http://novelupdates.com');

    if (await browser.exists('#search_form_input_homepage')) {
      console.log("Déjà connecté à internet");
      return;
    }

    //assert(await browser.exists('input[name="username"]'), "Pas d'endroit où mettre le login");

    let username = await prompt("username: ");
    let password = await prompt.password("password: ");

    await browser.evaluate((user, pass) => {
      document.querySelector('input[name="username"]').value = user;
      document.querySelector('input[name="password"]').value = pass;

      submitAction();
    }, username, password);

    console.log ("Submit effectué!");

  } catch(err) {
    console.error(err);
  }
}

run();