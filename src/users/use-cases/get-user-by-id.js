import { localhostUserToModel } from '../mappers/localhost-user.mapper'

/**
 * @param {String|number} id 
 * @returns {Promise<User>}
 */


export const getUserById = async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/users/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const user = localhostUserToModel(data)

    return user
}