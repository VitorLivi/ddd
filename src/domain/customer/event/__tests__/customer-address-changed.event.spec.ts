import { Customer } from "../../entity/customer";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

describe('CustomerAddressChangedEvent Tests', () => {
  test('constructor should set eventData', () => {
    const customer = new Customer('123', 'John Doe')
    const eventInstance = new CustomerAddressChangedEvent(customer);

    expect(eventInstance.eventData).toBe(customer);
  });

  test('constructor should set dataTimeOccurred to current date', () => {
    const customer = { id: 1, name: 'John Doe' };
    const currentDate = new Date();

    const originalDate = Date;
    // @ts-expect-error
    global.Date = jest.fn(() => currentDate);
    global.Date.UTC = originalDate.UTC;
    global.Date.parse = originalDate.parse;
    global.Date.now = originalDate.now;

    const eventInstance = new CustomerAddressChangedEvent(customer);

    expect(eventInstance.dataTimeOccurred).toBe(currentDate);
    global.Date = originalDate;
  });
});