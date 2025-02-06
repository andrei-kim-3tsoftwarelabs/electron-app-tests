import { Channels } from "../const";
import type { AppDriver } from "../types";
import { UIAppDriver } from "../drivers/UI";
import { APIAppDriver } from "../drivers/API";
import { ThemeStubDsl } from "./ThemeStubDsl";
import { WireMock } from "wiremock-captain";
import { ThemeStubDriver } from "../drivers/ThemeStubDriver";
import { assert } from "chai";

/**
 * AppDrivers manages different drivers based on communication channels.
 */
export class AppDrivers implements AppDriver {
  private drivers = {} as {
    [Channels.UI]: UIAppDriver;
    [Channels.API]: APIAppDriver;
  };
  public themeStubDsl: ThemeStubDsl;

  constructor(wireMock: WireMock) {
    this.drivers[Channels.UI] = new UIAppDriver();
    // this.drivers[Channels.API] = new APIAppDriver();
    this.themeStubDsl = new ThemeStubDsl(new ThemeStubDriver(wireMock));
  }

  get driver() {
    return this.drivers[Channels.UI];
  }

  // @Override
  public async setQuery(query: string) {
    await this.driver.setQuery(query);
  }

  // @Override
  public async clickRunQuery() {
    await this.driver.clickRunQuery();
  }

  // @Override
  public async getQueryResult() {
    return this.driver.getQueryResult();
  }

  public async toggleAdvancedView() {
    await this.driver.toggleAdvancedView();
  }

  public getQueryHistoryResults() {
    return this.driver.getQueryHistoryResults();
  }

  public async getLastQueryFromHistory() {
    return this.driver.getLastQueryFromHistory();
  }

  public async clickRandomItemInHistory() {
    await this.driver.clickRandomItemInHistory();
  }

  public getQueryHistoryResultsContainer() {
    return this.driver.getQueryHistoryResultsContainer();
  }

  public async getAdvancedViewToggleValue() {
    return this.driver.getAdvancedViewToggleValue();
  }

  public async checkAppMenuExist() {
    return this.driver.checkAppMenuExist();
  }

  public async clickOnMenuItem(menuId: string) {
    await this.driver.clickOnMenuItem(menuId);
  }

  public async checkMenuItems() {
    return this.driver.checkMenuItems();
  }

  public async getModalContainer() {
    return this.driver.getModalContainer();
  }

  public async getLightThemeSwitch() {
    return this.driver.getLightThemeSwitchContainer();
  }
  public async getDarkThemeSwitch() {
    return this.driver.getDarkThemeSwitchContainer();
  }

  public async getSystemThemeSwitch() {
    return this.driver.getSystemThemeSwitchContainer();
  }

  public async getUriInput() {
    return this.driver.getUriInputContainer();
  }

  public async getDatabaseNameInput() {
    return this.driver.getDatabaseNameInputContainer();
  }

  public async getCollectionNameInput() {
    return this.driver.getCollectionNameInputContainer();
  }

  public async getApplySettingsButton() {
    return this.driver.getApplySettingsButtonContainer();
  }

  public async getCancelSettingsButton() {
    return this.driver.getCancelSettingsButtonContainer();
  }
}

export class AppDsl {
  private driver: AppDrivers;

  constructor(driver: AppDrivers) {
    this.driver = driver;
  }

  public async setQuery(query: string) {
    await this.driver.setQuery(query);
  }

  public async clickRunQuery() {
    await this.driver.clickRunQuery();
  }

  public async getQueryResult() {
    return this.driver.getQueryResult();
  }

  public async toggleAdvancedView() {
    await this.driver.toggleAdvancedView();
  }

  public async getQueryHistoryResults() {
    return this.driver.getQueryHistoryResults();
  }

  public async getQueryHistoryResultsLenght() {
    const history = await this.driver.getQueryHistoryResults();
    return history.length;
  }

  public async getLastQueryFromHistory() {
    return this.driver.getLastQueryFromHistory();
  }

  public async clickRandomItemInHistory() {
    await this.driver.clickRandomItemInHistory();
  }

  public async getQueryHistoryResultsContainer() {
    return this.driver.getQueryHistoryResultsContainer();
  }

  public async getAdvancedViewToggleValue() {
    return this.driver.getAdvancedViewToggleValue();
  }

  public async checkAppMenuExist() {
    const appMenuExists = await this.driver.checkAppMenuExist();

    assert.equal(
      appMenuExists,
      true,
      "MongoDB Query Executor menu item exists"
    );
  }

  public async clickOnAppMenu() {
    await this.driver.clickOnMenuItem("appName");
  }

  public async clickOnSettingsMenu() {
    await this.driver.clickOnMenuItem("settings");
  }

  public async checkMenuItems() {
    const hasCorrectSubmenuItems = await this.driver.checkMenuItems();

    assert.equal(
      hasCorrectSubmenuItems,
      true,
      "Has three necessary submenu items"
    );
  }

  public async checkSettingsMenuVisible() {
    const settingsModalContainer = await this.driver.getModalContainer();

    await expect(settingsModalContainer).toBeDisplayed();
  }

  public async checkLightThemeSwitchVisible() {
    const lightThemeRadio = await this.driver.getLightThemeSwitch();
    await expect(lightThemeRadio).toBeDisplayed();
  }

  public async checkDarkThemeSwitchVisible() {
    const darkThemeRadio = await this.driver.getDarkThemeSwitch();
    await expect(darkThemeRadio).toBeDisplayed();
  }

  public async checkSystemThemeSwitchVisible() {
    const systemThemeRadio = await this.driver.getSystemThemeSwitch();
    await expect(systemThemeRadio).toBeDisplayed();
  }

  public async checkUriInputVisible() {
    const uriInput = await this.driver.getUriInput();
    await expect(uriInput).toBeDisplayed();
  }

  public async checkDatabaseNameInputVisible() {
    const databaseNameInput = await this.driver.getDatabaseNameInput();
    await expect(databaseNameInput).toBeDisplayed();
  }

  public async checkCollectionNameInputVisible() {
    const collectionNameInput = await this.driver.getCollectionNameInput();
    await expect(collectionNameInput).toBeDisplayed();
  }

  public async checkApplySettingsButtonVisible() {
    const applyButton = await this.driver.getApplySettingsButton();
    await expect(applyButton).toBeDisplayed();
  }

  public async checkCancelSettingsButtonVisible() {
    const cancelButton = await this.driver.getCancelSettingsButton();
    await expect(cancelButton).toBeDisplayed();
  }

  public async checkDefaultTheme() {
    const systemThemeRadio = await this.driver.getSystemThemeSwitch();
    await expect(systemThemeRadio).toBeChecked();
  }

  public async checkDefaultUri() {
    const uriInput = await this.driver.getUriInput();
    await expect(uriInput).toHaveValue("mongodb://localhost:27017");
  }

  public async checkDefaultDatabaseName() {
    const databaseNameInput = await this.driver.getDatabaseNameInput();
    await expect(databaseNameInput).toHaveValue("test");
  }

  public async checkDefaultCollectionName() {
    const collectionNameInput = await this.driver.getCollectionNameInput();
    await expect(collectionNameInput).toHaveValue("test");
  }
}
