export class Customer {
  _id: string;
  _name: string;
  _address: string;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
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

  changeName(name: string) {
    this.validateLength(name);

    this._name = name;
  }

  changeAddress(address: string) {
    this.validateLength(address);

    this._address = address;
  }
}
