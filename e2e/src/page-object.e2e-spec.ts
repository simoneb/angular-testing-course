import { browser, logging } from 'protractor'

import { AppPage } from './app.po'

xdescribe('Page Object tests', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('should display welcome message', () => {
    page.navigateTo()

    expect(page.getTitleText()).toEqual('Angular Testing Course')
  })

  it('should display welcome message [async]', async () => {
    await page.navigateTo()

    expect(await page.getTitleText()).toEqual('Angular Testing Course')
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER)

    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      })
    )
  })
})
