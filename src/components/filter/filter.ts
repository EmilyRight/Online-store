/* eslint-disable */
import { AppEvents } from '../../utils/enums/app-events'
import FilterSearch from './search/filter-search'
import Render from '../abstracts/render';
import './filter'
export default class FilterAccumulator extends Render {
  private _filterSearch = '';
  private readonly ID_CLASS_FILTERS = 'filters'
  private readonly CLASS_FILTERS = 'filters .wrapper'
  constructor() {
    super();
    document.addEventListener(AppEvents.EVENT_SEARCH, (event) => this.changeSearchFilterHandler.call(this, <CustomEvent>event))
  }
  private generateEvent() {
    document.dispatchEvent(new CustomEvent(AppEvents.EVENT_FILTER, {
      detail: {
        title: this._filterSearch,
      }
    }))
  }

  private changeSearchFilterHandler(event: CustomEvent) {
    this._filterSearch = event.detail?.title
    this.generateEvent()
  }

  renderFilters(): void{
    super.renderContent(this.ID_CLASS_FILTERS, this.CLASS_FILTERS)
  }
}
