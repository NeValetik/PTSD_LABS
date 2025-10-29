interface Prototype {
  clone(): Prototype;
}

class Bacteria implements Prototype {
  private id: string;
  private name: string;
  private description: string;

  constructor({id, name, description, instance}: {id?: string, name?: string, description?: string, instance?: Bacteria}) {
    if (instance) {
      this.id = instance.id;
      this.name = instance.name;
      this.description = instance.description;
      return;
    }
    if (!id || !name || !description) {
      throw new Error("id, name, and description are required");
    }
    this.id = id;
    this.name = name;
    this.description = description;
  }

  clone(): Prototype {
    return new Bacteria({instance: this});
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }
}

export { Bacteria, Prototype };