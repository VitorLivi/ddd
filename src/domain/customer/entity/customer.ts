import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import { Address } from "../value-object/address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private eventDispatcher: EventDispatcher

  constructor(id: string, name: string, eventDispatcher?: EventDispatcher) {
    this._id = id;
    this._name = name;
    this.validate();

    if (eventDispatcher) {
      const customerCreatedEvent = new CustomerCreatedEvent(this)
      this.eventDispatcher = eventDispatcher;
      this.eventDispatcher.notify(customerCreatedEvent);
    }
  }

  validate() {
    this.validateLength(this._id, "id");
    this.validateLength(this._name, "name");
  }

  validateLength(param: string, name: string) {
    if (param.length === 0) {
      throw new Error('Invalid length for ' + name);
    }
  }

  get rewardPoints() {
    return this._rewardPoints;
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
    this.validateLength(name, "name");

    this._name = name;
  }

  changeAddress(address: Address) {
    this._address = address;

    if (this.eventDispatcher) {
      const customerAddressChangedEvent = new CustomerAddressChangedEvent(this)
      this.eventDispatcher.notify(customerAddressChangedEvent);
    }
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is undefined");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
