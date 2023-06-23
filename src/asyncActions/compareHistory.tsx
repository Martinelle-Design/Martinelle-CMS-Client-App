import { isEqual } from "lodash";

type CompareHistoryProps<T> = T & {
  id: string;
};
function createHashmap<T>(arr: (T & { id: string })[]) {
  let hashmap: {
    [key: string]: T;
  } = {};
  arr.forEach((item) => {
    hashmap[item.id] = item;
  });
  return hashmap;
}
const determineObjChanges = <T,>(
  oldItems: (T & { id: string })[],
  newItems: (T & { id: string })[]
) => {
  const oldHashmap = createHashmap(oldItems);
  const newHashmap = createHashmap(newItems);
  const differentNewItems = newItems.filter((item) => {
    const oldItem = oldHashmap[item.id];
    return !isEqual(oldItem, item);
  });
  const differentOldItems = oldItems.filter((item) => {
    const newItem = newHashmap[item.id];
    return !isEqual(newItem, item);
  });
  return { differentNewItems, differentOldItems };
};
const compareHistory = async <T,>(
  oldItems: CompareHistoryProps<T>[],
  newItems: CompareHistoryProps<T>[]
) => {
  const oldItemsIdArr = oldItems.map((item) => item.id);
  const newItemIdArr = newItems.map((item) => item.id);
  const oldSet = new Set(oldItemsIdArr);
  const newSet = new Set(newItemIdArr);
  const addedItems = newItems.filter((item) => !oldSet.has(item.id));
  const removedItems = oldItems.filter((item) => !newSet.has(item.id));
  const newSameItemsById = newItems.filter((item) => oldSet.has(item.id));
  const oldSameItemsById = oldItems.filter((item) => newSet.has(item.id));
  //it doesn't matter which one we use as it will always be the same
  //since we seperated already filtered out the same items by id
  const { differentNewItems: updatedItems } = determineObjChanges(
    oldSameItemsById,
    newSameItemsById
  );
  return { addedItems, removedItems, updatedItems };
};
export default compareHistory;
