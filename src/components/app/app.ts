import Header from '../header/header'
import Footer from '../footer/footer'
import productsData from '../../products'
import Catalog from '../catalog/catalog'

export default class App {
  private readonly view
  private readonly footer
  private readonly catalog
  constructor () {
    this.view = new Header()
    this.footer = new Footer()
    this.catalog = new Catalog(productsData)
  }

  start (): void {
    this.view.renderHeader()
    this.footer.renderFooter()
    this.catalog.renderCardsArray()
  }
}
