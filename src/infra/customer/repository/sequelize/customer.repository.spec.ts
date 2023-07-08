import { Sequelize } from "sequelize-typescript";
import { CustomerRepository } from './customer.repository';
import { CustomerModel } from "./customer.model";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
      models: [CustomerModel],
    });

    await sequelize.sync();
  });


  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Rua 1", 123, "Zipcode", "São Paulo");
    const customer = new Customer("1", "Customer 1")

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const address = new Address("Rua 1", 123, "Zipcode", "São Paulo");
    const customer = new Customer("1", "Customer 1");

    customer.changeAddress(address);

    customerRepository.create(customer);
    customer.changeName("Product 1 updated");
    customer.changeAddress(new Address("Rua 2", 456, "Zipcode 2", "São Paulo 2"));
    customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customerModel.id,
      name: customerModel.name,
      active: customerModel.active,
      rewardPoints: customerModel.rewardPoints,
      street: customerModel.street,
      number: customerModel.number,
      zipcode: customerModel.zipcode,
      city: customerModel.city
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Rua 1", 123, "Zipcode", "São Paulo");
    const customer = new Customer("1", "Customer 1");

    customer.changeAddress(address);

    customerRepository.create(customer);
    const productFound = await customerRepository.find("1");

    expect(productFound).toEqual(customer);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const address = new Address("Rua 1", 123, "Zipcode", "São Paulo");

    const customer1 = new Customer("1", "Customer 1");
    const customer2 = new Customer("2", "Customer 2");

    customer1.changeAddress(address);
    customer2.changeAddress(address);

    customerRepository.create(customer1);
    customerRepository.create(customer2);

    const customersFound = await customerRepository.findAll();

    expect(customersFound).toEqual([customer1, customer2]);
  });

  it("should throw an error when customer not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find("1")).rejects.toThrowError(
      "Customer not found"
    );
  });
});