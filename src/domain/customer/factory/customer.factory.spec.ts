import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('Customer 1');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer 1');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Address 1', 1, "13330-250", "São Paulo");
    const customer = CustomerFactory.createWithAddress('Customer 1', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer 1');
    expect(customer.address).toBeInstanceOf(Address);
  })
})
