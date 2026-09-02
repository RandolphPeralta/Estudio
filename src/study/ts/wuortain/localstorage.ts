// Se esta realizando la persistencia

type User = {}

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
      return null; // datos corruptos
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

const storage = new MemoryLocalStorage();
storage.save<User>("users", { id: "1", name: "Randolph", role: "admin" });
const user = storage.load<User>("users");
console.log(user);
