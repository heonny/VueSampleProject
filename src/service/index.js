import loginAPI from "./loginAPI";

export default {
    async login(email, userPw) {
        try {
            const loginResponse = await loginAPI.login(email, userPw)
            return loginResponse
        } catch (e) {
            console.error(e)
        }
    }
}