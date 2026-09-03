// Se esta realizando la persistencia

//IDEA1---------------------
interface localstoragerepository<T> {
  save(key: string, data: T): void
  load(key: string): T | null
  remove(key: string): void
}

type UserId = string & { readonly __brand: 'UserId' };

interface User {
  name: string;
  id: UserId;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
}

class MemoryLocalStorage<T extends Object> implements localstoragerepository<T> {
  
  save(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  load(key: string): T | null {
    const raw = localStorage.getItem(key);

    if (!raw) return null;
    var item = JSON.parse(raw) as T

    for (const value of Object.values(item)) {
            if (value === "" || value === null || value === undefined) {
                return null;
            }
        }

    try {
      return item;
    } catch {
      return null
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

const storage = new MemoryLocalStorage();

function createUserId(id: string): UserId {
  return id as UserId;
}

const user1: User = {
  name: "Randolph",
  id: createUserId("abc123"), 
  email: "randolph@example.com",
  passwordHash: "hashed_1234",
  role: "admin"
};

storage.save("user1", user1);
const user = storage.load("user1");
console.log(user);


// //IDEA2
// export type UserId = string & { readonly __brand: 'UserId' };
// export type PersonId = string & { readonly __brand: 'PersonId' };
// export type ProjectId = string & { readonly __brand: 'ProjectId' };

// interface Person {
//   id: PersonId;
//   name: string;
//   active: boolean;
// }

// interface User {
//   name: string;
//   id: UserId;
//   email: string;
//   passwordHash: string;
//   role: 'admin' | 'user';
// }

// type ProjectStatus = 'open' | 'closed';

// interface Project {
//   id: ProjectId;
//   name: string;
//   description: string;
//   tasks: string[];
//   status: ProjectStatus;
// }

// //-----------

// export interface Storage<T> {
//   save(key: string, data: T): void
//   load(key: string): T | null
//   remove(key: string): void
// }

// export class StorageCorruptedDataError extends Error {
//     constructor(public readonly key: string) {
//         super(`Stored data for "${key}" is corrupted`);
//     }
// }

// export class StorageInvalidDataError extends Error{
//   constructor(private key: string){
//     super(`Stored data for "${key}" is error`);
//   }
// }

// export type Validator<T> = (value: unknown) => value is T;

// export class LocalStorageRepository<T> implements Storage<T> {

//     constructor(private readonly validator: Validator<T>) {}

//     save(key: string, value: T): void {

//         const serialized =
//             JSON.stringify(value);

//         localStorage.setItem(
//             key,
//             serialized
//         );
//     }

//     load(key: string): T | null {

//         const stored =
//             localStorage.getItem(
//                 key
//             );

//         if (stored === null) {
//             return null;
//         }

//         let parsed: unknown;

//         try {
//             parsed = JSON.parse(stored);
//         } catch {
//             throw new StorageCorruptedDataError(
//                 key
//             );
//         }

//         if (!this.validator(parsed)) {
//             throw new StorageInvalidDataError(
//                 key
//             );
//         }

//         return parsed;
//     }

//     remove(key: string): void {

//         localStorage.removeItem(
//             key
//         );
//     }
// }

// function createUserId(id: string): UserId {
//   return id as UserId;
// }

// const user1: User = {
//   name: "Randolph",
//   id: createUserId("abc123"), 
//   email: "randolph@example.com",
//   passwordHash: "hashed_1234",
//   role: "admin"
// };

// // const localstoragerepository = new LocalStorageRepository()
// //-------------------------}


