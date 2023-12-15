import { showModal } from '../render-modal/render-modal'
import './render-add-button.css'


/**
 * 
 * @param {HTMLDivElement} elementHtml 
 * @param {() => void} callback
 */
export const renderAddButton = (elementHtml, callback) => {

    const fabButton = document.createElement('button')
    fabButton.innerText = '+'
    fabButton.classList.add('fab-button')

    elementHtml.append(fabButton)

    fabButton.addEventListener('click', () => {
        showModal()
    })

}