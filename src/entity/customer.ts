import { Address } from "./address";

export class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }
  
  validate() {
    this.validateLength(this._id);
    this.validateLength(this._id);
  }

  validateLength(param: string) {
    if (param.length === 0) {
      throw new Error('Invalid length');
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  changeName(name: string) {
    this.validateLength(name);

    this._name = name;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
