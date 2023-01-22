import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/order-item";

let customer = new Customer('123', 'John Doe');
const address = new Address('Main Street', 2, '12345-678', 'Sao Paulo');

customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10);
const item2 = new OrderItem('2', 'Item 2', 20);
const order = new Order('1', customer.id, [item1, item2]);
