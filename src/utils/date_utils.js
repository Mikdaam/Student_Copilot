let stringDate = "05/12/2022";
let hour = "14:00";
let formatDate = stringDate.replace(/(\d+[./-])(\d+[./-])/, '$2$1');

console.log(`Date: ${stringDate} => FormatDate: ${formatDate}`);

// For remainder

let date = new Date(`${formatDate} ${hour}`);
console.log(`The date is ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`);

const oneWeekBefore = new Date(date.setDate(date.getDate() - 7));
console.log(`One week before the date is ${oneWeekBefore.getDate()}/${oneWeekBefore.getMonth() + 1}/${oneWeekBefore.getFullYear()} at ${oneWeekBefore.getHours()}:${oneWeekBefore.getMinutes()}`);

date = new Date(`${formatDate} ${hour}`);

const oneDayBefore = new Date(date.setDate(date.getDate() - 1));
console.log(`One day before the day is ${oneDayBefore.getDate()}/${oneDayBefore.getMonth() + 1}/${oneDayBefore.getFullYear()} at ${oneDayBefore.getHours()}:${oneDayBefore.getMinutes()}`);

// For view week
// Credits : https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript

const currentDate = new Date("03/06/2022");
let firstDate = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() == 0 ? -6:1);
let lastDate = firstDate + 6;
const startOfWeek = new Date(currentDate.setDate(firstDate));
console.log(`The begin of this week was : ${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1}/${startOfWeek.getFullYear()}`);
const endOfWeek = new Date(currentDate.setDate(lastDate));
console.log(`The end of this week is : ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}/${endOfWeek.getFullYear()}`);
