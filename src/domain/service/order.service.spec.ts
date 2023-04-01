import { OrderItem } from '../entity/order-item';
import { Order } from '../entity/order';
import { OrderService } from './order.service';
import { Customer } from '../entity/customer';
describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'John Doe');
    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it('should get total of all orders', () => {
    const orderItem1 = new OrderItem('123', 'Product 1', 100, 'p1', 2);
    const orderItem2 = new OrderItem('456', 'Product 2', 200, 'p2', 2);

    const order1 = new Order('o1', 'c1', [orderItem1]);
    const order2 = new Order('o2', 'c2', [orderItem2]);


    const total = OrderService.total([order1, order2]);

    expect(total).toBe(600);
  });
});
