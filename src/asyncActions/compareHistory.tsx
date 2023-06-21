type CompareHistoryProps<T> = T & {
  id: string;
};
function createHashmap<T>(arr: T[]) {
  let hashmap: {
    [key: string]: T;
  } = {};
  arr.forEach((item) => {
    hashmap[JSON.stringify(item)] = item;
  });
  return hashmap;
}
const determineObjChanges = <T,>(oldItems: T[], newItems: T[]) => {
  const oldHashmap = createHashmap(oldItems);
  const newHashmap = createHashmap(newItems);
  const differentNewItems = newItems.filter(
    (item) => !(JSON.stringify(item) in oldHashmap)
  );
  const differentOldItems = oldItems.filter(
    (item) => !(JSON.stringify(item) in newHashmap)
  );
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
    newSameItemsById,
    oldSameItemsById
  );
  return { addedItems, removedItems, updatedItems };
};
export default compareHistory;
