import { Product } from "../entity/product";
import ProductCreatedEvent from "./product-created.event";

describe('ProductCreatedEvent Tests', () => {
  test('constructor should set eventData', () => {
    const product = new Product('123', 'Product', 10)
    const eventInstance = new ProductCreatedEvent(product);

    expect(eventInstance.eventData).toBe(product);
  });

  test('constructor should set dataTimeOccurred to current date', () => {
    const product = new Product('123', 'Product', 10)
    const currentDate = new Date();

    const originalDate = Date;
    // @ts-expect-error
    global.Date = jest.fn(() => currentDate);
    global.Date.UTC = originalDate.UTC;
    global.Date.parse = originalDate.parse;
    global.Date.now = originalDate.now;

    const eventInstance = new ProductCreatedEvent(product);
    expect(eventInstance.dataTimeOccurred).toBe(currentDate);
    global.Date = originalDate;
  });
});