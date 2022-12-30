import Header from '../header/header'
import Footer from '../footer/footer'
import productsData from '../../products'
import Catalog from '../catalog/catalog'
import FilterSearch from '../filter/search/filter-search'
import { AppTag } from '../../utils/enums/app-tag'
import { FilterCssClass } from '../../utils/enums/filter-css-class'

export default class App {
  private readonly view
  private readonly footer
  private readonly catalog
  private readonly filterSearch
  constructor () {
    this.view = new Header()
    this.footer = new Footer()
    this.catalog = new Catalog(productsData)
    this.filterSearch = new FilterSearch()
  }

  start (): void {
    this.view.renderHeader()
    this.footer.renderFooter()
    this.catalog.renderCardsArray()
    const container = document.createElement(AppTag.DIV)
    container.classList.add(FilterCssClass.MAIN_CONTAINER)
    const filterContainer = document.createElement(AppTag.DIV)
    filterContainer.classList.add(FilterCssClass.FILTER)
    filterContainer.append(this.filterSearch.getElement())
    container.append(filterContainer)
  }
}
