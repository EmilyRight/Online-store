import Header from '../header/header'
import Footer from '../footer/footer'
import productsData from '../../products'
import Catalog from '../catalog/catalog'
import FilterSearch from '../filter/search/filter-search'
import FilterAccumulator from '../filter/filter'
// import { AppTag } from '../../utils/enums/app-tag'
// import { FilterCssClass } from '../../utils/enums/filter-css-class'

export default class App {
  private readonly view
  private readonly footer
  private readonly catalog
  private readonly filterSearch
  private readonly filter
  constructor () {
    this.view = new Header()
    this.footer = new Footer()
    this.catalog = new Catalog(productsData)
    this.filterSearch = new FilterSearch()
    this.filter = new FilterAccumulator()
  }

  start (): void {
    this.view.renderHeader()
    this.footer.renderFooter()
    this.catalog.renderCardsArray()
    this.filterSearch.getElement()
    this.filter.renderFilters()
  }
}
