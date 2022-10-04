/* eslint-disable no-undef */
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const url = "http://127.0.0.1:5501";

// const url = 'https://github.com/DjRaulito/MineSweeper';

// Primero saber cuantos divs hay en todo el board y luego saber cuantos divs tienen la clase correspondiente y comparar
// si las 2 consultas dan el mismo numero o no y dar un true o false
async function CountBoardCells() {
  let rows = page.$$('#column1 div');
  let numRows = rows.length;
  let columns = page.$$('[class="hidden"]');
  let numColumns = columns.length;
  numCells = numColumns * numRows;
}

async function buttonClick(buttonId) {
	await page.click(`[data-testid="${buttonId}"]`, { force: true });
}

Given("the user opens the app", async function() {
  await page.goto(url);
});
Given("the user loads in the board the following MockData: {string}",async function(string) {
	let urlMockData = "http://127.0.0.1:5501?" + string;
  await page.goto(urlMockData);
});


Then("on the board all the cells should be hidden", async function() {
  const numHiddenCellsBoard = await page.$$('[class=".hiddenCell"]');
  const numCellsBoard = await page.$$('[class=".cell"]');
  expect(numHiddenCellsBoard.length).toBe(numCellsBoard.length);
});


Then("the value of {string} is {string}", async function(string, string2) {
  let valueID = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(valueID).toBe(string2);
});


Then("the face should be {string}", async function(string) {
  let valueID = await page.locator('[[data-testid="face"]').innerText();
  expect(valueID).toBe(string);
});


When('the user Reveal the cell {string}', async function (string) {
let cellExposed = page.locator(`[data-testid="${string}"]`);
await buttonClick(string);
const classCell = await cellExposed.getAttribute('class');
expect(classCell.includes('exposed')).toBeTruthy();
});

Then('the cell {string} should be {string}',async function (string, string2) {
let cellClicked = await page.locator(`[data-testid="${string}"]`).innerText();
expect(cellClicked).toBe(string2)
});