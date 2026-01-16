interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;

const userUpdates: PartialUser = {
  name: 'Alice', 
};

function updateUser(id: number, updates: PartialUser) {};