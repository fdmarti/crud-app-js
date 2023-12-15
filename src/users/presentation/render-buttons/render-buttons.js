import usersStore from '../../store/user-store'
import { renderTable } from '../render-table/render-table'
import './render-buttons.css'


/**
 * 
 * @param {HTMLDivElement} elementHtml 
 */
export const renderButtons = (elementHtml) => {

    const nextButton = document.createElement('button')
    nextButton.innerText = 'Next'

    const previousButton = document.createElement('button')
    previousButton.innerText = 'Prev'

    const currentPageLabel = document.createElement('label')
    currentPageLabel.id = 'current-page'
    currentPageLabel.innerText = usersStore.getCurrentPage()

    elementHtml.append(previousButton, currentPageLabel, nextButton)


    nextButton.addEventListener('click', async () => {
        await usersStore.loadNextPage()
        reloadTable()
    })

    previousButton.addEventListener('click', async () => {
        await usersStore.loadPreviousPage()
        reloadTable()
    })


    const reloadTable = () => {
        currentPageLabel.innerText = usersStore.getCurrentPage()
        renderTable(elementHtml)
    }
}