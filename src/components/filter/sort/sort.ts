/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FilterObject } from '../../../utils/types/IFilterObject'
export default class CatalogSort {
  cardArray: FilterObject[]

  constructor (cardArray: FilterObject[]) {
    this.cardArray = cardArray
  }

  sortAtoZ (): FilterObject[] {
    return this.cardArray.sort((a, b) => {
      if (a.title! > b.title!) {
        return 1
      }
      if (a.title! < b.title!) {
        return -1
      }
      return 0
    })
  }

  sortZtoA (): FilterObject[] {
    return this.cardArray.sort((a, b) => {
      if (a.title! > b.title!) {
        return -1
      }
      if (a.title! < b.title!) {
        return 1
      }
      return 0
    })
  }

  sortPriceMax (): FilterObject[] {
    return this.cardArray.sort((a, b) => +a.price! - +b.price!)
  }

  sortManaMin (): FilterObject[] {
    return this.cardArray.sort((a, b) => +b.price! - +a.price!)
  }
}
