import { DragOverEvent } from "@dnd-kit/core";
import { determineChunkSize } from "../../helpers/splitArr";
export const gridOnDragOver = <T,>({
  e,
  items,
  setItems,
}: {
  e: DragOverEvent;
  items: (T & {
    id: string;
  })[];
  setItems: React.Dispatch<
    React.SetStateAction<
      (T & {
        id: string;
      })[]
    >
  >;
}) => {
  const activeData = e.active as any;
  const overData = e.over as any;
  const activeId = e.active.id;
  const activeItemData = activeData?.data?.current;
  const newActiveItemData = overData?.data?.current;
  const activeItemIdx = activeItemData?.sortable?.index;
  const newActiveItemIdx = newActiveItemData?.sortable?.index;
  const oldColIdx = activeItemData?.colIdx;
  const newColIdx = newActiveItemData?.colIdx;
  const totalColumns = activeItemData.totalColumns;
  if (
    activeItemIdx === undefined ||
    newActiveItemIdx === undefined ||
    activeItemIdx === null ||
    newActiveItemIdx === null ||
    oldColIdx === null ||
    oldColIdx === undefined ||
    newColIdx === null ||
    newColIdx === undefined ||
    totalColumns === null ||
    totalColumns === undefined
  )
    return;
  const newItems = [...items];
  const colChunkSizes = determineChunkSize(newItems, totalColumns);
  const adjustedOldIdx =
    oldColIdx - 1 < 0
      ? activeItemIdx
      : colChunkSizes
          .slice(0, oldColIdx)
          .reduce((a, b) => +a + +b, +activeItemIdx);
  const adjustedNewIdx =
    newColIdx - 1 < 0
      ? newActiveItemIdx
      : colChunkSizes
          .slice(0, newColIdx)
        .reduce((a, b) => +a + +b, +newActiveItemIdx);
  const newItem = items.find((item) => item.id === activeId);
  if (!newItem) return;
  newItems.splice(adjustedOldIdx, 1);
  newItems.splice(adjustedNewIdx, 0, newItem);
  setItems(newItems);
};
