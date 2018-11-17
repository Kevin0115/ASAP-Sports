const { reloadApp } = require('detox-expo-helpers');

describe('Example', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should go to gametype screen when findGame button clicked', async () => {
    await element(by.id("dev-login")).multiTap(3);
    // await element(by.id("dev-login")).tap();
    // await element(by.id("dev-login")).tap();
    await waitFor(element(by.id('homescreen'))).toBeVisible().withTimeout(2000);
    await element(by.id("findGame-button")).tap();
    await waitFor(element(by.id("gametype-screen"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("gametype-screen"))).toBeVisible();
    //   await waitFor(element(by.id('gametype-screen'))).toBeVisible().withTimeout(2000);
    await waitFor(element(by.id('Basketball'))).toBeVisible().withTimeout(2000);
    await element(by.id("Basketball")).tap();
    await waitFor(element(by.id("browse-games-screen"))).toBeVisible().withTimeout(2000);
    await expect(element(by.id("browse-games-screen"))).toBeVisible();
    await element(by.id("create-game-button")).tap();
    await expect(element(by.id("game-info-screen"))).toBeVisible();
    await waitFor(element(by.id('game-title-input'))).toBeVisible().withTimeout(2000);
    await element(by.id('game-title-input')).replaceText('test game1');
    await element(by.id("time-date-button")).tap();
    await expect(element(by.id("time-date-screen"))).toBeVisible();

    await element(by.id("date-picker-button")).tap();
    // await waitFor(element(by.traits(['button']))).toBeVisible().withTimeout(2000);
    await element(by.type('UIPickerView')).atIndex(0).setColumnToValue(2,"2016");
    await element(by.type('UIPickerView')).atIndex(0).tapAtPoint({x:100, y:220});

    await element(by.id("time-picker-button")).tap();
    // await waitFor(element(by.traits(['button']))).toBeVisible().withTimeout(2000);
    await element(by.type('UIPickerView')).atIndex(0).setColumnToValue(2,"AM");
    await element(by.type('UIPickerView')).atIndex(0).tapAtPoint({x:100, y:220});


    await element(by.id("duration-picker-button")).tap();
    // await waitFor(element(by.traits(['button']))).toBeVisible().withTimeout(2000);
    await element(by.type('UIPickerView')).atIndex(0).tapAtPoint({x:100, y:220});


    await element(by.id("location-screen-button")).tap();
    await waitFor(element(by.id('location-input'))).toBeVisible().withTimeout(2000);
    await element(by.id('location-input')).replaceText('Kits Beach');
    await element(by.id("num-player-picker-button")).tap();
    // await waitFor(element(by.id('3'))).toBeVisible();
    // await element(by.id('3')).tap();
    await element(by.id('modal-content')).tapAtPoint({x:100, y:200});
    await element(by.id("num-player-confirm")).tap();

    await element(by.id("review-screen-button")).tap();

    await waitFor(element(by.id('done-button'))).toBeVisible().withTimeout(2000);
    await element(by.id("done-button")).tap();
    await element(by.id("modal-ok-button")).tap();
    // await waitFor(element(by.id('chosen-date'))).toHaveText('Wednesday, November 16, 2016').withTimeout(2000);
    // await expect(element(by.id('chosen-date'))).toHaveText('Wednesday, November 16, 2016');
    // await element(by.text('Confirm')).tap();
  });

  // it('should go 2', async () => {
  //   await waitFor(element(by.id('gametype-screen'))).toBeVisible().withTimeout(2000);
  //   await element(by.id("Basketball")).tap();
  //   await expect(element(by.id("browse-games-screen"))).toBeVisible();
  // });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.label('Hello!!!'))).toBeVisible();
  // });
  //
  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.label('World!!!'))).toBeVisible();
  // });
});