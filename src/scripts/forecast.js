export default class Forecast {
  constructor(json) {
    this.days = this.createDays(json.days);
    this.address = json.address;

  }

  createDays(data) {
    const days = [];

    for (const day of data) {

    }

    return days;
  }
}