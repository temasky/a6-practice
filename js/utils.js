function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  let d = Math.floor(Math.random() * 5) + 1;
  let n = Math.floor(Math.random() * 5) + 1;
  return `#slot-${d}${n}`;
}
