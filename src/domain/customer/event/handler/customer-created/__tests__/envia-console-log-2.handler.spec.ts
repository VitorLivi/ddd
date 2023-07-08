import EventDispatcher from "../../../../../@shared/event/event-dispatcher";
import { Customer } from "../../../../entity/customer";
import EnviaConsoleLog2Handler from "../envia-console-log-2.handler";

describe('EnviaConsoleLog2Handler Tests', () => {
  it('should log when event notify', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);

    new Customer('123', 'Customer 1', eventDispatcher);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(`Esse é o segundo console.log do evento: CustomerCreated`);
  });
});