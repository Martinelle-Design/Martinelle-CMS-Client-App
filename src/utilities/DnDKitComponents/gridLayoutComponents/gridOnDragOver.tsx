import { DragOverEvent } from "@dnd-kit/core";
import { ServiceItem } from "../../types/types";
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
    console.log(e)
  const activeData = e.active as any;
  const overData = e.over as any;
  const activeId = e.active.id;
  const activeItemIdx = activeData?.data?.current?.sortable?.index;
  const newActiveItemIdx = overData?.data?.current?.sortable?.index;
  if (
    activeItemIdx === undefined ||
    newActiveItemIdx === undefined ||
    activeItemIdx === null ||
    newActiveItemIdx === null
  )
    return;
  const newItems = [...items];
  const newItem = items.find((item) => item.id === activeId);
  if (!newItem) return;
    newItems.splice(activeItemIdx, 1);
    newItems.splice(newActiveItemIdx, 0, newItem);
  setItems(newItems);
};
