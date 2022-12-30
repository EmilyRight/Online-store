/* eslint-disable */
import { AppEvents } from '../../utils/enums/app-events'
import FilterSearch from './search/filter-search'

export default class FilterAccumulator {
  private _filterSearch = '';
  private _filterPrice = 2000;
  constructor() {
    document.addEventListener(AppEvents.EVENT_SEARCH, (event) => this.changeSearchFilterHandler.call(this, <CustomEvent>event))
    document.addEventListener(AppEvents.EVENT_PRICE, (event) => this.changeNumberFilterHandler.call(this, <CustomEvent>event))
  }
  
  private generateEvent() {
    document.dispatchEvent(new CustomEvent(AppEvents.EVENT_FILTER, {
      detail: {
        title: this._filterSearch,
        price: this._filterPrice
      }
    }))
  }

  private changeSearchFilterHandler(event: CustomEvent) {
    this._filterSearch = event.detail?.title
    this.generateEvent()
  }

  private changeNumberFilterHandler(event: CustomEvent) {
    this._filterPrice = event.detail?.price
    this.generateEvent()
  }

  renderFilters(): void{
    
  }
}
