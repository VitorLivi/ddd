import { Order } from "./order";
import { OrderItem } from "./order-item";

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
    const item1 = new OrderItem("1", "Item 1", 10);
    const item2 = new OrderItem("2", "Item 2", 20);
    const order = new Order("1", "123", [item1, item2]);

    expect(order.total()).toBe(30);
  });
});
