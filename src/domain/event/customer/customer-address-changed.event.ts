import EventInterface from "../@shared/event.interface";
export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(customer: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = customer;
  }
}
