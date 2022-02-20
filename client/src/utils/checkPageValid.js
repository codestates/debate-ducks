export default function checkPageValid(value, lastPage) {
  return value.length <= 1 ? !/[^1-9]/g.test(value) : !/[^0-9]/g.test(value) && parseInt(value) <= lastPage;
}
