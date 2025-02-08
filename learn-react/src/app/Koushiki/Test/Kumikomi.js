const months = ["Jan", "March", "April", "May"];
months.splice(0, 2, [["Feb", "June"]]);
console.log(months);

const array1 = ["a", "b", "c"];
const iterator = array1.values();
console.log(iterator);
for (const value of iterator) {
  console.log(value);
}

const arr = ["a", "b", "c", "d", "e"];

const values = arr.values();
for (const value of values) {
  console.log(value);
  if (value === "b") {
    console.log("一旦休憩");
    break;
  }
}

for (const value of values) {
  console.log(value);
}
