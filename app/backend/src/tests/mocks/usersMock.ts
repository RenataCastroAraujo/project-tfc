const oneUserMock = {
  username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
          // senha: secret_admin
}

const loginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const failedLoginMock = {
  email: '',
  password: '',
}

const invalidData = {
  email: 'email@invalido.com',
  password: 'senhainvalida'
}

const allUsersMock = [
  {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        // senha: secret_admin
    },
    {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
        // senha: secret_user
  }
]

const tokenMock = {
  'token': 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'
}

export {
  tokenMock,
  allUsersMock,
  oneUserMock,
  loginMock,
  failedLoginMock,
  invalidData
}
