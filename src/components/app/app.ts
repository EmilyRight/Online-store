import Header from '../header/header'
import Footer from '../footer/footer'

export default class App {
  private readonly view
  private readonly footer
  constructor () {
    this.view = new Header()
    this.footer = new Footer()
  }

  start (): void {
    this.view.renderHeader()
    this.footer.renderFooter()
  }
}
