import userStore from "./store/user-store"
import { renderAddButton } from "./presentation/render-add-button/render-add-button"
import { renderButtons } from "./presentation/render-buttons/render-buttons"
import { renderModal } from "./presentation/render-modal/render-modal"
import { renderTable } from "./presentation/render-table/render-table"
import { saveUser } from "./use-cases/save-user"

/**
 * @param {HTMLElement} elementHtml 
 */

export const UserApp = async (elementHtml) => {
    elementHtml.innerHTML = 'Loading...'
    await userStore.loadNextPage()
    elementHtml.innerHTML = ''

    renderTable(elementHtml)
    renderButtons(elementHtml)
    renderAddButton(elementHtml)
    renderModal(elementHtml, async (userLike) => {
        const user = await saveUser(userLike)
        userStore.onUserChanged(user)
        renderTable(elementHtml)
    })
}