export class User {
    /**
     * @param {Like<User>} userDataLike 
     */
    constructor({ id, isActive = true, balance, avatar, firstName = 'Random Name', lastName = 'Random Lastname', gender }) {
        this.id = id
        this.isActive = isActive
        this.balance = balance
        this.avatar = avatar
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
    }
}