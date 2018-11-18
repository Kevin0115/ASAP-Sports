const { reloadApp } = require('detox-expo-helpers');

describe('Game creation flow', () => {
  it('should go to homescreen after login', async () => {
    await reloadApp();
    await element(by.id("dev-login")).multiTap(3);
    await waitFor(element(by.id('homescreen'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('homescreen'))).toBeVisible();
  });

  it('should go to go to gametype screen when find game button pressed', async () => {
    await waitFor(element(by.id('findGame-button'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('findGame-button'))).toBeVisible();
    await element(by.id("findGame-button")).tap();
    await waitFor(element(by.id("gametype-screen"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("gametype-screen"))).toBeVisible();
  });

  it('should go to go to browse game screen when find game type pressed', async () => {
    //   await waitFor(element(by.id('gametype-screen'))).toBeVisible().withTimeout(2000);
    await waitFor(element(by.id('Basketball'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('Basketball'))).toBeVisible();
    await element(by.id("Basketball")).tap();
    await waitFor(element(by.id("browse-games-screen"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("browse-games-screen"))).toBeVisible();
  });

  it('should go to go to game info screen when find create game pressed', async () => {
    await waitFor(element(by.id('create-game-button'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('create-game-button'))).toBeVisible();
    await element(by.id("create-game-button")).tap();
    await waitFor(element(by.id("game-info-screen"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("game-info-screen"))).toBeVisible();
  });


  it('should go to go to time date selection screen when next button pressed', async () => {
    await waitFor(element(by.id('game-title-input'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('game-title-input'))).toBeVisible();
    await element(by.id('game-title-input')).replaceText('test game1');
    await element(by.id("time-date-button")).tap();
    await waitFor(element(by.id("time-date-screen"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("time-date-screen"))).toBeVisible();
  });

  it('should go to go to location selection screen when date and time entered, and next button pressed', async () => {
    await waitFor(element(by.id("date-picker-button"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("date-picker-button"))).toBeVisible();
    await element(by.id("date-picker-button")).tap();
    await element(by.type('UIPickerView')).atIndex(0).setColumnToValue(2, "2016");
    await element(by.type('UIPickerView')).atIndex(0).tapAtPoint({x: 100, y: 220});
    await element(by.id("time-picker-button")).tap();
    await element(by.type('UIPickerView')).atIndex(0).setColumnToValue(2, "AM");
    await element(by.type('UIPickerView')).atIndex(0).tapAtPoint({x: 100, y: 220});
    await element(by.id("duration-picker-button")).tap();
    await element(by.type('UIPickerView')).atIndex(0).tapAtPoint({x: 100, y: 220});
    await element(by.id("location-screen-button")).tap();
    await waitFor(element(by.id('location-input'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('location-input'))).toBeVisible();
  });

  it('should go to go to review game screen when location and player max entered, and next button pressed', async () => {
    await waitFor(element(by.id("location-input"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("location-input"))).toBeVisible();
    await element(by.id('location-input')).replaceText('Kits Beach');
    await element(by.id("num-player-picker-button")).tap();
    await element(by.id('modal-content')).tapAtPoint({x: 100, y: 200});
    await element(by.id("num-player-confirm")).tap();
    await element(by.id("review-screen-button")).tap();
    await waitFor(element(by.id("review-screen"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("review-screen"))).toBeVisible();
  });

  it('should go to go to home screen when create my game pressed', async () => {
    await waitFor(element(by.id('done-button'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('done-button'))).toBeVisible();
    await element(by.id("done-button")).tap();
    await element(by.id("modal-ok-button")).tap();
    await waitFor(element(by.id('homescreen'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('homescreen'))).toBeVisible();
  });
});
