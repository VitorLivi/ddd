export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(
    id: string,
    name: string,
    price: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string) {
    this.validateLength(this.name, "name");
    this._name = name;
  }

  changePrice(price: number) {
    if (this._price < 0) {
      throw new Error("Invalid price");
    }

    this._price = price;
  }

  private validate() {
    this.validateLength(this._id, "id");
    this.validateLength(this._name, "name");

    if (this._price < 0) {
      throw new Error("Invalid price");
    }
  }

  validateLength(param: string, name: string) {
    if (param.length === 0) {
      throw new Error("Invalid length for " + name);
    }
  }
}