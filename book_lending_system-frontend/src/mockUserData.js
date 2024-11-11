// src/mockUserData.js
let mockUsers = []; // Store registered users in memory

export const loginUser = (email, password) => {
  const user = mockUsers.find(user => user.email === email && user.password === password);
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  return user; // Return the user object if login is successful
};

export const registerUser = ({ name, email, password }) => {
  if (mockUsers.find(user => user.email === email)) {
    throw new Error("Email is already registered.");
  }
  const newUser = { name, email, password };
  mockUsers.push(newUser); // Save new user to mockUsers array
  return newUser; // Return the newly registered user
};
