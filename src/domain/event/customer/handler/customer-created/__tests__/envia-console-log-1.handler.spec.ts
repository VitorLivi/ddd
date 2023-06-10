import { Address } from "../../../../../entity/address";
import { Customer } from "../../../../../entity/customer";
import EventDispatcher from "../../../../@shared/event-dispatcher";
import CustomerCreatedEvent from "../../../customer-created.event";
import EnviaConsoleLog1Handler from "../envia-console-log-1.handler";

describe('EnviaConsoleLog1Handler Tests', () => {
  it('should log when event notify', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);

    new Customer('123', 'Customer 1', eventDispatcher);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(`Esse é o primeiro console.log do evento: CustomerCreated`);
  });
});