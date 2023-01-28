import OrderItem from '../entity/order-item';
import { Order } from '../entity/order';
import { OrderService } from './order.service';
describe('Order service unit tests', () => {
  it('should get total of all orders', () => {
    const orderItem1 = new OrderItem('123', 'Product 1', 100, 'p1', 2);
    const orderItem2 = new OrderItem('456', 'Product 2', 200, 'p2', 2);

    const order1 = new Order('o1', 'c1', [orderItem1]);
    const order2 = new Order('o2', 'c2', [orderItem2]);


    const total = OrderService.total([order1, order2]);

    expect(total).toBe(600);

  });
});