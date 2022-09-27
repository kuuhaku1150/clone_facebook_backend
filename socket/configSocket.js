const users = [];

const addUser = (id,room) => {
  // const existingUser = users.find(
  //   (user) => user.name.trim().toLowerCase() === name.trim().toLowerCase()
  // );

  // if (existingUser) return { error: "Username has already been taken" };
  // if (!name && !room) return { error: "Username and room are required" };
  // if (!name) return { error: "Username is required" };
  if (!room) return { error: "Room is required" };

  const user = { id, room };
  users.push(user);
  return { user };
};

const getUser = (name) => {
  let user = users.find((user) => user.name === name);
  return user;
};

const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, getUsers };
