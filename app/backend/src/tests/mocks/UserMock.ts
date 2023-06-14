const user = {
    id: 1,
    username: 'User',
    email: 'user@user.com',
    role: 'user',
    password: 'secret_user',
  };
  
  const validLoginBody = { email: 'user@user.com', password: 'secret_user' };

  const userRegistered = { ...user, password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' };

  export {
    user,
    userRegistered,
    validLoginBody
  }