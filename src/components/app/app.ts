import Header from '../header/header'
import productsData from '../../products'
import Catalog from '../catalog/catalog'

export default class App {
  private readonly view
  private readonly catalog
  constructor () {
    this.view = new Header()
    this.catalog = new Catalog(productsData)
  }

  start (): void {
    this.view.renderHeader()
    this.catalog.renderCardsArray()
  }
}
