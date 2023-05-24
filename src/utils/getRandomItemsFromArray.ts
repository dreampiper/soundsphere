export default function getRandomItemsFromArray(arr: any[], maxLength: number) {
  var items: any[] = [];
  var length = arr.length;

  if (length <= maxLength) {
    return arr;
  }

  while (items.length < maxLength) {
    var randomIndex = Math.floor(Math.random() * length);
    var item = arr[randomIndex];

    if (!items.includes(item)) {
      items.push(item);
    }
  }

  return items;
}
