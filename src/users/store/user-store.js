import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page"

const state = {
    user: [],
    currentPage: 0
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1)
    if (users.length === 0) return;

    state.currentPage += 1
    state.user = users
}

const loadPreviousPage = async () => {
    if (state.currentPage === 1) return;

    const users = await loadUsersByPage(state.currentPage - 1)
    if (users.length === 0) return;

    state.currentPage -= 1
    state.user = users

}

/**
 * 
 * @param {User} user 
 */
const onUserChanged = (updatedUser) => {
    let wasFound = false
    state.user = state.user.map(user => {
        if (updatedUser.id === user.id) {
            wasFound = true
            return updatedUser
        }

        return user
    })

    if (state.length < 10 && !wasFound) {
        state.users.push(updatedUser)
    }
}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage)
    if (users.length === 0) {
        await loadPreviousPage()
        return
    }
    state.user = users
}


export default {


    getCurrentPage: () => state.currentPage,
    /**
     * @returns {User[]} 
     */
    getUsers: () => [...state.user],

    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
}