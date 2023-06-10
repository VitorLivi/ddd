import EventDispatcher from "../event/@shared/event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../event/product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from '../event/product/product-created.event';

export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  private eventDispatcher: EventDispatcher;

  constructor(
    id: string,
    name: string,
    price: number,
    eventDispatcher?: EventDispatcher
  ) {
    this._id = id;
    this._name = name;
    this._price = price;

    if (eventDispatcher) {
      const productCreatedEvent = new ProductCreatedEvent(this)
      this.eventDispatcher = eventDispatcher;
      this.eventDispatcher.notify(productCreatedEvent);
    }

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