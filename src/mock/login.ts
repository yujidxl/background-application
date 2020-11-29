const userMap = {
  admin: {
    email: 'admin@jk.com',
    password: '123456'
  }
};

export default {
  loginByEmail: (config: any) => {
    const { email, password } = JSON.parse(config.body);
    if (
      email === userMap.admin.email &&
      password === userMap['admin']['password']
    ) {
      return {
        code: 0,
        msg: 'login successed,congrations!',
        data: {
          identify: 'admin'
        }
      };
    } else {
      return {
        code: -1,
        msg: 'login failed! please check your input and then try again!'
      };
    }
  },
  logout: () => 'success'
};
