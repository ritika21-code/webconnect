// userState.js
export let users = [];
export const addUser = (userData, socketId) => {
  const newUser = { ...userData, socketId };
  !users.some((user) => user.sub === userData.sub) && users.push(newUser);
  console.log('User added:', newUser);
  console.log('Current users:', users);
};

export const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log('User removed:', socketId);
};

export const getUser = (userId) => {
  const user = users.find((user) => user.sub === userId);

  if (!user) {
    console.error(`User with ID ${userId} not found or has no socketId`);
    return null; // Return null or handle the case appropriately
  }

  console.log(user);
  return user;
};


