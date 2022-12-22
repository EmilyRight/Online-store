import Render from '../abstracts/render'
import './footer'
export default class Footer extends Render {
  private readonly CLASS_FOOTER = 'footer'
  renderFooter (): void {
    super.renderContent(this.CLASS_FOOTER, this.CLASS_FOOTER)
  }
}
