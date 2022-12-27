/* eslint-disable */
import { AppEvents } from '../../utils/enums/app-events'

export default class FilterAccumulator {
  private _filterSearch = '';
  private _filterPrice = 1000;
  constructor() {
    document.addEventListener(AppEvents.EVENT_SEARCH, (event) => this.changeSymbolFilterHandler.call(this, <CustomEvent>event))
    document.addEventListener(AppEvents.EVENT_PRICE, (event) => this.changeNumberFilterHandler.call(this, <CustomEvent>event))
  }

  private generateEvent() {
    document.dispatchEvent(new CustomEvent(AppEvents.EVENT_FILTER, {
      detail: {
        text: this._filterSearch,
        balance: this._filterPrice
      }
    }))
  }

  private changeSymbolFilterHandler(event: CustomEvent) {
    this._filterSearch = event.detail?.text
    this.generateEvent()
  }

  private changeNumberFilterHandler(event: CustomEvent) {
    this._filterPrice = event.detail?.balance
    this.generateEvent()
  }
}
