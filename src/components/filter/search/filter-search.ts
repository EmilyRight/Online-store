/* eslint-disable */
import { FilterCssClass } from '../../../utils/enums/filter-css-class'
import { AppEvents } from '../../../utils/enums/app-events'
import { AppTag } from '../../../utils/enums/app-tag'
import '../search/filter-search.scss'

export default class FilterSearch {
  private readonly _component = document.createElement(AppTag.DIV)
  private readonly _input = document.createElement(AppTag.INPUT)
  private readonly WRAPPER = 'filters .wrapper'

  constructor () {
    this.createElement()
    this._input.addEventListener('keyup', () => {
      document.dispatchEvent(new CustomEvent(AppEvents.EVENT_SEARCH, {
        detail: {
          title: this._input.value
        }
      }))
    })
  }
  getElement () {
    return this._component;
  }
  private createElement() {
    const wrapper = document.querySelector('.' + this.WRAPPER) as HTMLElement;
    this._component.classList.add(FilterCssClass.FILTER_CONTAINER_ROW);
    const text = document.createElement(AppTag.LABEL);  
    this._component.append(text);
    this._component.append(this._input);
    wrapper.append(this._component);
  }
}