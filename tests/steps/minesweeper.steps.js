/* eslint-disable no-undef */
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const url = "http://127.0.0.1:5501";
const num = 8;
// const url = ' https://djraulito.github.io/MineSweeperBDD/';

	// Primero saber cuantos divs hay en todo el board y luego saber cuantos divs tienen la clase correspondiente y comparar
	// si las 2 consultas dan el mismo numero o no y dar un true o false

Given("the user opens the app", async () => {
  await page.goto(url);
});

Then("on the board all the cells should be hidden", async () => {
	let numBoardDivs = 64;
	const numHiddenCellsBoard = await page.$$('[class="hiddenCell"]');
	expect(numHiddenCellsBoard.length).toBe(numBoardDivs);
});