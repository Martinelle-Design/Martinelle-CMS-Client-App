export default function removeDuplicates<T>(
    
  arr: (T & { id: string })[]
): (T & { id: string })[] {
    //create hashmap
  let unique: {
    [key: string]: boolean;
  } = {};
  arr.forEach(function (i) {
    if (!unique[i.id]) {
      unique[i.id] = true;
    }
  });
  const newArr = [] as (T & { id: string })[];
  arr.forEach((item) => {
    //delete key and add first item found
    if (unique[item.id]) {
      newArr.push(item);
      delete unique[item.id];
    }
  });
  return newArr;
}
