// Se esta realizando la persistencia

export interface Storage<T> {
  save(data: T): void
  load(): T | null
  remove(): void
}

export type UserId = string & { readonly __brand: 'UserId' };
export type PersonId = string & { readonly __brand: 'PersonId' };
export type ProjectId = string & { readonly __brand: 'ProjectId' };

interface Person {
  id: PersonId;
  name: string;
  active: boolean;
}

export interface User {}

class MemoryLocalStorage {
  save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  load<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null; 
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

const storage = new MemoryLocalStorage();
storage.save<User>("user1", { id: "1", name: "Randolph", role: "admin" });
const user = storage.load<User>("user1");
console.log(user);
