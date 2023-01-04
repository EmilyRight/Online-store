import Header from '../header/header'
import Footer from '../footer/footer'
import productsData from '../../products'
import Catalog from '../catalog/catalog'
import Cart from '../cart/cart'

export default class App {
  private readonly header
  private readonly footer
  private readonly catalog
  // private readonly cart
  constructor () {
    this.header = new Header()
    this.footer = new Footer()
    this.catalog = new Catalog(productsData)
    // this.cart = new Cart()
  }

  start (): void {
    this.header.renderHeader()
    this.footer.renderFooter()
    this.catalog.init()
  }
}
