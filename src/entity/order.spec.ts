import { Order } from "./order";
import OrderItem from './order-item';

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Invalid length for id");
  });

  it("should throw an error when customerId is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError("Invalid length for customerId");
  });

  it("should throw an error when items is empty", () => {
    expect(() => new Order("1", "123", [])).toThrowError("Invalid length for items");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
    const order = new Order("1", "123", [item1, item2]);

    expect(order.total()).toBe(60);
  });

  it("should throw error if the item quantity is less or equal zero", () => {
    const item1 = new OrderItem("1", "Item 1", 10, "p1", 0);

    expect(() => new Order("1", "123", [item1])).toThrowError("Quantity must be greater than zero");
  });
});
