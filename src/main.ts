import { Address } from "./domain/entity/address";
import { Customer } from "./domain/entity/customer";
import { Order } from "./domain/entity/order";

let customer = new Customer('123', 'John Doe');
const address = new Address('Main Street', 2, '12345-678', 'Sao Paulo');

customer.address = address;
customer.activate();
