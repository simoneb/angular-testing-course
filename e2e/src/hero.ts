import { ElementFinder, by } from 'protractor'

export class Hero {
  id: number
  name: string

  // Hero from string formatted as '<id> <name>'.
  static fromString(s: string): Hero {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1)
    }
  }

  // Hero from hero list <li> element.
  static async fromLi(li: ElementFinder): Promise<Hero> {
    const stringsFromA = await li.all(by.css('a')).getText()
    const strings = stringsFromA[0].split(' ')
    return { id: +strings[0], name: strings[1] }
  }

  // Hero id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Hero> {
    // Get hero id from the first <div>
    const id = await detail
      .all(by.css('div'))
      .first()
      .getText()
    // Get name from the h2
    const name = await detail.element(by.css('h2')).getText()
    return {
      id: +id.substr(id.indexOf(' ') + 1),
      name: name.substr(0, name.lastIndexOf(' '))
    }
  }
}
