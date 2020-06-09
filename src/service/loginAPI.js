const doLogin = (email, userPw) => {
  let vm = this
  return vm.$http.get('/api/doLogin', {
    params: {
      'email': email,
      'userPw': userPw
    }
  })
}

const emailChk = email => {
  let vm = this
  return vm.$http.get('/api/emailcheck', {
    params: {
      'email': email
    }
  })
}

export default {
  async login(email, userPw) {
    try {
      const emailChkPromise = await emailChk(email)
      const doLoginPromise = await doLogin(email, userPw)
      const [emailChkResponse, doLoginResponse] =
          await Promise.all([emailChkPromise, doLoginPromise])
      if (emailChkResponse.data.length === 0) {
        return 'noEmail'
      }
      if (doLoginResponse.data.length !== 0) {
        return 'done'
      }

      return doLoginResponse
    } catch (err) {
      console.error(err)
    }
  }
}