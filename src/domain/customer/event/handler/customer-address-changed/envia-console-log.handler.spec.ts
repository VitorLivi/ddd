import { Address } from "../../../value-object/address";
import { Customer } from "../../../entity/customer";
import EnviaConsoleLogHandler from "./envia-console-log.handler";
import EventDispatcher from "../../../../@shared/event/event-dispatcher";

describe('EnviaConsoleLogHandler Tests', () => {
  it('should log when event notify', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler);

    const address = new Address('Rua 1', 1, '12345-678', 'São Paulo');
    const customer = new Customer('123', 'Customer 1', eventDispatcher);
    customer.changeAddress(address);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${address.toString()}`);
  });
});