import Header from '../header/header'

export default class App {
  private readonly view

  constructor () {
    this.view = new Header()
  }

  start (): void {
    this.view.renderHeader()
  }
}
