const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default class Day {
  constructor(json) {
    this.datetime = new Date(json.datetime);
    this.dayOfWeek = dayNames[this.datetime.getDay()];
    this.dayOfMonth = this.datetime.getDate();
    this.month = monthNames[this.datetime.getMonth()];

    this.avgTemp = json.temp;
    this.tempMax = json.tempmax;
    this.tempMin = json.tempmin;
    this.feelsLike = json.feelslike;


  }
}