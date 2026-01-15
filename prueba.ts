interface User {
  id: number;
  name: string;
  email: string;
}

// Create a new type where all properties from User are optional
type PartialUser = Partial<User>;

const userUpdates: PartialUser = {
  name: 'Alice', // Only providing the 'name' property is valid
  // 'id' and 'email' are now optional and can be omitted
};

function updateUser(id: number, updates: PartialUser) {
  // function logic to apply updates
}
