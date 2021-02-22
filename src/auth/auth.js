//document.cookie = "AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax"

const login = {
    saveUser(user) {
        let data = JSON.stringify(user);
        localStorage.setItem('storageUserBv', data);
    },
    checkUser(user) {
        if (!user) {
            localStorage.removeItem('storageUserBv')

            return false

        } else {
            const obj = JSON.parse(user)

            if (obj.authorizedUser && obj.token) {

                document.cookie = "User=" + obj.name + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax"

                return obj
            }
        }
    },
    checkLocalStorage() {
        if (localStorage.getItem('storageUserBv')) {
            localStorage.removeItem('storageUserBv')
        }
    },
    logout() {
        localStorage.removeItem('storageUserBv')
        return true
    }
}

export default login