export function convertDate(inputFormat: string | number | Date) {
  function pad(s: string | number) {
    return +s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
}
