function average(list) {
  let sum = 0;

  list.forEach(function (num) {
    sum += num;
  });

  return sum / list.length;
}

module.exports = average;
