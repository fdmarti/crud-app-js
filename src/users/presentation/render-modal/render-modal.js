import './render-modal.css'

import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';
import modalHtml from './render-modal.html?raw'


let modal, form, loadedUser;

/**
 * @param {HTMLDivElement} elementHtml 
 * @param {(user)=> Promise<void>} callback
 */

export const renderModal = (elementHtml, saveUserCallBack) => {

    if (modal) return

    modal = document.createElement('div')
    modal.innerHTML = modalHtml
    modal.classList.add('modal-container', 'hide-modal')
    elementHtml.append(modal)

    modal.addEventListener('click', (event) => {
        if (event.target.className !== 'modal-container') return
        hideModal()
    })

    const modalSubmitBtn = document.querySelector('.submit')
    form = document.querySelector('form')

    modalSubmitBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const formData = new FormData(form)
        const userLike = { ...loadedUser, }
        userLike['isActive'] = false

        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = Number(value)
                continue
            }

            if (key === 'isActive') {
                userLike[key] = true
                continue
            }

            userLike[key] = value
        }

        console.log({userLike})
        await saveUserCallBack(userLike)
        hideModal()
    })

}

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async (id) => {
    modal?.classList.remove('hide-modal')

    if (!id) return

    const user = await getUserById(id)
    setFormValues(user)
}

export const hideModal = () => {
    modal?.classList.add('hide-modal')
    form?.reset()
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName
    form.querySelector('[name="lastName"]').value = user.lastName
    form.querySelector('[name="balance"]').value = user.balance
    form.querySelector('[name="isActive"]').checked = user.isActive

    loadedUser = user

}