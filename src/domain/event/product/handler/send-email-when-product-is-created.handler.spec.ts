import { Product } from "../../../entity/product";
import EventDispatcher from "../../@shared/event-dispatcher";
import ProductCreatedEvent from "../product-created.event";
import SendEmailWhenProductIsCreatedHandler from "./send-email-when-product-is-created.handler";

describe("SendEmailWhenProductIsCreatedHandler Tests", () => {
  it("should log when event notify", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    new Product("123", "Product", 10, eventDispatcher);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(`Send email to ......`);
  });
});