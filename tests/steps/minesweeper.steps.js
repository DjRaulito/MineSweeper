/* eslint-disable no-undef */
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const url = "http://127.0.0.1:5501";
// const url = "http://127.0.0.1:3000";

// const url = 'https://github.com/DjRaulito/MineSweeper';

// Primero saber cuantos divs hay en todo el board y luego saber cuantos divs tienen la clase correspondiente y comparar
// si las 2 consultas dan el mismo numero o no y dar un true o false
async function CountBoardCells() {
  let rows = page.$$("#column1 div");
  let numRows = rows.length;
  let columns = page.$$('[class="hidden"]');
  let numColumns = columns.length;
  numCells = numColumns * numRows;
}

async function buttonClick(buttonId) {
  await page.click(`[data-testid="${buttonId}"]`, { force: true });
}

async function buttonRightClick(buttonId) {
  await page.locator(`[data-testid="${buttonId}"]`).click({ button: "right" });
}

Given("the user opens the app", async function () {
  await page.goto(url);
});
Given(
  "the user loads in the board the following MockData: {string}",
  async function (string) {
    let urlMockData = "http://127.0.0.1:5501?" + string;
    // let urlMockData = "http://127.0.0.1:3000?" + string;

    await page.goto(urlMockData);
  }
);

Then("on the board all the cells should be hidden", async function () {
  const numHiddenCellsBoard = await page.locator('[class=".hiddenCell"]');
  const numCellsBoard = await page.locator('[class=".cell"]');
  expect(numHiddenCellsBoard.length).toBe(numCellsBoard.length);
});

Then("the value of {string} is {string}", async function (string, string2) {
  let valueID = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(valueID).toBe(string2);
});

Then("the face should be {string}", async function (string) {
  let valueID = await page.locator('[data-testid="face"]').innerText();
  expect(valueID).toBe(string);
});

When("the user reveal the cell {string}", async function (string) {
  await buttonClick(string);
});

Then("the cell {string} should be {string}", async function (string, string2) {
  let cellClicked = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(cellClicked).toBe(string2);
});

Then("the user should {string}", async function (string) {
  let cellExposed = page.locator(`[data-testid="${string}"]`);
  const classCell = await cellExposed.getAttribute("class");
  expect(classCell.includes("mined")).toBeTruthy();
  expect().toBeTruthy;
});
Then("the cell {string} should be mine", async function (string) {
  let mineCharacter = await page
    .locator(`[data-testid="${string}"]`)
    .innerText();
  expect(mineCharacter).toBe("\u{1F4A3}");
});

Then("the user should lose", async function () {
  let cellExposed = await page.locator('[id="face"]').innerText();
  expect(cellExposed).toBe("sad");
});

Then("the user should be a mine on the cell {string}", async function (string) {
  let mineCharacter = await page
    .locator(`[data-testid="${string}"]`)
    .innerText();
  expect(mineCharacter).toBe("\u{1F4A3}");
});

Then("the user should be won", async function () {
  let cellExposed = await page.locator('[id="face"]').innerText();
  expect(cellExposed).toBe("happy");
});

Then(
  "the cell {string} should be tagged as {string}",
  async function (string, string2) {
    let cellTagged = await page
      .locator(`[data-testid="${string}"]`)
      .innerText();
    if (string2 == "mined") {
      string2 = "\u{1F6A9}";
    } else if (string2 == "uncertain") {
      string2 = "\u{003F}";
    }
    expect(cellTagged).toBe(string2);
  }
);
Then(
  "the cell {string} would be revealed and should be {string}",
  async function (string, string2) {
    let cellClicked = await page
      .locator(`[data-testid="${string}"]`)
      .innerText();
    expect(cellClicked).toBe(string2);
  }
);

When("the user tags as {string} the cell {string}",
  async function (string, string2) {
    await buttonRightClick(string2);
    if (string == "mined") {
      string = "\u{1F6A9}";
    } else if (string == "uncertain") {
      await buttonRightClick(string2);
      string = "\u{003F}";
    }
  }
);

When("the user untags the cell {string}", async function (string) {
  let cellPrevious = await page
    .locator(`[data-testid="${string}"]`)
    .innerText();
  if (cellPrevious == "\u{1F6A9}") {
    await buttonRightClick(string);
    await buttonRightClick(string);
  } else if (cellPrevious == "\u{003F}") {
    await buttonRightClick(string);
  }
});

Then("the cell {string} shouldn't be tagged", async function (string) {
  let cellTagged = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(cellTagged).toBe("");
});

When(
  "the user {int} click with righClick on the cell {string}",
  async function (int, string) {
    if (int == 1) {
      await buttonRightClick(string);
    } else if (int == 2) {
      await buttonRightClick(string);
      await buttonRightClick(string);
    }
  }
);

Given(
  "the user tags as {string} on the cell {string}",
  async function (string, string2) {
    
    if (string == "mined") {
      await buttonRightClick(string2);
    } else if (string2 == "uncertain") {
      await buttonRightClick(string2);
      await buttonRightClick(string2);
    }
  }
);

When(
  "the user {int} click with righClick on the mined {string}",
  async function (int, string) {
    if (int == 1) {
      await buttonRightClick(string);
    } else if (int == 2) {
      await buttonRightClick(string);
      await buttonRightClick(string);
    }
  }
);

Then("the cell {string} shouldn't show information", async function (string) {
  let cellTagged = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(cellTagged).toBe("");
});

When(
  "the user {int} click with righClick on the flag {string}",
  async function (int, string) {
    if (int == 1) {
      await buttonRightClick(string);
    } else if (int == 2) {
      await buttonRightClick(string);
      await buttonRightClick(string);
    }
  }
);

Given("the {string} is {int}", function (string, int) {
  return 'pased';
});

Then('the counter is {int}',async function (int) {
  let flagCounterValue =await page.locator('[data-testid="flagCounter"]').innerText();
  expect(flagCounterValue).toBe(int.toString());
});

When('the user untags as {string} on the cell {string}',async function (string, string2) {
  if (string == "mined") {
    await buttonRightClick(string2);
  } else if (string2 == "uncertain") {
    await buttonRightClick(string2);
    await buttonRightClick(string2);
  }
});

Then('all the cells are disabled',async function () {
  const numHiddenCellsBoard = await page.locator('[class=".disabled"]');
  const numCellsBoard = await page.locator('[class=".cell"]');
  expect(numHiddenCellsBoard.length).toBe(numCellsBoard.length);
});