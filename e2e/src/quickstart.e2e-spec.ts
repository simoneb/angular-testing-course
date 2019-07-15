import { browser, element, by, $$ } from 'protractor'

import { writeScreenShot } from './testing/file-system'

describe('tour of heroes e2e quick start', () => {
  beforeEach(() => {
    browser.get('')
  })

  it('have right title', () => {
    expect(browser.getTitle()).toBe('Angular Testing Course')
  })

  it('should navigate to /dashboard', () => {
    expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}dashboard`)
  })

  it('should search for a hero', () => {
    const searchBox = element(by.id('search-box'))

    searchBox.sendKeys('magne')

    const searchResults = $$('ul.search-result > li')

    browser.waitForAngular()

    expect(searchResults.count()).toBe(1)
  })

  it('should search for a hero with async/await', async () => {
    const searchBox = element(by.id('search-box'))

    await searchBox.sendKeys('magne')

    await browser.waitForAngular()

    const searchResults = $$('ul.search-result > li')

    expect(await searchResults.count()).toBe(1)
  })

  it('should navigate to hero details page', async () => {
    const searchBox = element(by.id('search-box'))

    await searchBox.sendKeys('magne')

    const searchResults = $$('ul.search-result > li')

    await browser.waitForAngular()

    const magnetaLink = searchResults.first()

    const magnetaUrl = await magnetaLink.$('a').getAttribute('href')

    await magnetaLink.click()

    expect(await browser.getCurrentUrl()).toBe(magnetaUrl)
  })

  // 1) find a hero
  // 2) navigate to the hero detail page
  // 3) change the hero name
  // 4) save the hero
  // 5) assert that the hero has a new name
  it('should save a hero new name')

  // 1) navigate to the heroes page
  // 2) delete a hero
  // 3) assert that the hero got deleted
  it('should delete a hero')

  it('should take a screenshot', async () => {
    const png = await browser.takeScreenshot()

    writeScreenShot(png, __dirname + '/screenshots/screenshot.png')
  })
})
