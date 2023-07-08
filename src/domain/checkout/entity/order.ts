import { OrderItem } from "./order-item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  public get id(): string {
    return this._id;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public async changeItems(items: OrderItem[]) {
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    this.validateLength(this._id, "id");
    this.validateLength(this._customerId, "customerId");
    this.validateLength(this._items, "items");

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero");
    }
  }

  validateLength(param: string | OrderItem[], name: string) {
    if (param.length === 0) {
      throw new Error("Invalid length for " + name);
    }
  }

  total(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }

  toJSON() {
    return {
      id: this._id,
      customerId: this._customerId,
      items: this._items.map((item) => item.toJSON()),
      total: this._total,
    };
  }
}
