import { Address } from "./domain/customer/value-object/address";
import { Customer } from "./domain/customer/entity/customer";

let customer = new Customer('123', 'John Doe');
const address = new Address('Main Street', 2, '12345-678', 'Sao Paulo');

customer.address = address;
customer.activate();
