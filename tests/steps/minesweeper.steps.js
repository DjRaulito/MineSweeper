/* eslint-disable no-undef */
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const url = "http://127.0.0.1:5501";
const num = 8;
// const url = ' https://djraulito.github.io/MineSweeperBDD/';

Given("the user opens the app", async () => {
  await page.goto(url);
});

Then("on the board all the cells should be hidden", async () => {
	await page.locator(`[data-testid="${string}"]`); 
	await page.locator('data-testid=');
});
