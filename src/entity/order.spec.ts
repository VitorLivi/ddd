import { Address } from "./address";
import { Customer } from "./customer";

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrowError("Invalid length for id");
  });

  it("should throw an error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrowError("Invalid length for name");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John Doe");
    customer.changeName("John Doe 2");

    expect(customer.name).toBe("John Doe 2");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John Doe");
    const adress = new Address("Main Street", 2, "12345-678", "Sao Paulo");
    customer.address = adress;

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John Doe");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw erro when address is undefined", () => {
    const customer = new Customer("123", "John Doe");
  
    expect(() => customer.activate()).toThrowError("Address is undefined");
  });
});
