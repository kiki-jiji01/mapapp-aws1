const debug = process.env.NODE_ENV !== "production"

let baseURL = "https://pmakeh.com"

if (debug) {
    baseURL = "http://127.0.0.1:8000"
}

const apiURL = `${baseURL}/api`

export const API = {
    auth: {
        login: `${baseURL}/dj-rest-auth/login/`,
        logout: `${baseURL}/dj-rest-auth/logout/`,
        passwordReset: `${baseURL}/dj-rest-auth/password/reset/`,
        passwordResetConfirm: `${baseURL}/dj-rest-auth/password/reset/confirm/`,
        signup: `${baseURL}/dj-rest-auth/registration/`,
        verifyEmail: `${baseURL}/dj-rest-auth/registration/verify-email/`
    },
    
    countries: {
        list: `${apiURL}/countries/`,
        create: `${apiURL}/create-countries/`,
        retrieve: id => `${apiURL}/countries/${id}/`,
        update: id => `${apiURL}/countries/${id}/update/`,
       
    }
}