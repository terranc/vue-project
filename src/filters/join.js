export default function (array, separator) {
  return array.length === 1 ? array[0] : array.join(separator || ' ');
};
