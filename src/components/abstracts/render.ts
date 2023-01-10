export default abstract class Render {
  renderContent (id: string, blockClass: string): Element | HTMLDivElement | null {
    const fragment = document.createDocumentFragment()
    const template: HTMLDivElement | null = document.querySelector('#' + id)
    if (template instanceof HTMLTemplateElement) {
      const templateClone = template.content.cloneNode(true)
      fragment.append(templateClone)
    }

    const blockToInsert: HTMLDivElement | null = document.querySelector('.' + blockClass)

    blockToInsert?.append(fragment)
    return blockToInsert
  }

  handleElementVisibility (elementToShowClass: string, modifier: string): void {
    const elementToShow = document.querySelector('.' + elementToShowClass)
    if (elementToShow != null) {
      if (elementToShow.classList.contains(modifier)) {
        elementToShow.classList.remove(modifier)
      } else {
        elementToShow.classList.add(modifier)
      }
    }
  }

  createBlock (element: string, className: string): Element {
    const elementToCreate = document.createElement(element)
    elementToCreate.classList.add(className)
    return elementToCreate
  }

  appendBlock (block: Element, element: string, className: string): Element {
    block.append(this.createBlock(element, className))
    return block
  }
}
