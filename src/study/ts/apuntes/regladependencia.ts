// domain/entities/User.ts
export class User {
  constructor(
    public readonly id: string,
    public email: string,
    private active: boolean = false
  ) {}

  activate(): void {
    if (this.active) throw new Error("User already active");
    this.active = true;
  }

  isActive(): boolean {
    return this.active;
  }
}

// domain/repositories/UserRepository.ts
// import { User } from "../entities/User";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// application/usecases/CreateUserUseCase.ts
// import { UserRepository } from "../../domain/repositories/UserRepository";
// import { User } from "../../domain/entities/User";

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(email: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error("User already exists");

    const user = new User(Date.now().toString(), email);
    user.activate();
    await this.userRepo.save(user);
    return user;
  }
}

// infrastructure/repositories/InMemoryUserRepository.ts
// import { UserRepository } from "../../domain/repositories/UserRepository";
// import { User } from "../../domain/entities/User";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}

// main.ts
// import { CreateUserUseCase } from "./application/usecases/CreateUserUseCase";
// import { InMemoryUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";

const userRepo = new InMemoryUserRepository();
const createUser = new CreateUserUseCase(userRepo);

createUser.execute("randolph@example.com")
  .then(user => console.log("User created:", user))
  .catch(err => console.error(err.message));
