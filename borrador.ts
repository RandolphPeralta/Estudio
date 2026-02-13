import * as promptSync from "prompt-sync";
const prompt = (promptSync as any)();

interface ICommand {
  ejecutar(item: any): any
}

interface ICommando {
  ejecutar(): any
}

interface IRead<T> {
  show(): T[]
}

interface IAction<T> extends IRead<T> {
  save(item: any): any;
  delete(item: any): any;
  update(olditem: any, newitem: any): any;
}

class Memoria<T> implements IAction<T> {
    private memoria: Set<T> = new Set()

    save(item: T) {
        if (this.memoria.has(item)) return false
        this.memoria.add(item)
        return true
    }

    delete(item: T) {
        return this.memoria.delete(item)
    }

    update(oldItem: T, newItem: T) {
        if (!this.memoria.has(oldItem)) return false
        this.memoria.delete(oldItem)
        this.memoria.add(newItem)
        return true
    }

    show(): T[] {
        return [...this.memoria]
    }
}

class Servicio<T> implements IAction<T> {
  constructor(private memoria: IAction<T>) { }

  save(item: T): boolean {
    return this.memoria.save(item)
  }

  delete(id: any): boolean {
    return this.memoria.delete(id)
  }

  update(item: T, newitem: T): boolean {
    return this.memoria.update(item, newitem);
  }

  show() {
    return this.memoria.show()
  }
}