import { useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
const useSortableList = <T,>({
  defaultArr,
}: {
  defaultArr: (T & { id: string })[];
}) => {
  const [items, setItems] = useState(defaultArr ? defaultArr : []);
  const [activeId, setActiveId] = useState<null | string | number>(null);
  const onDragOver = (e: DragOverEvent) => {
    const activeData = e.active as any;
    const overData = e.over as any;
    const newItems = [...items];
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
    const newItem = items.find((item) => item.id === activeId);
    if (!newItem) return;
    newItems.splice(activeItemIdx, 1);
    newItems.splice(newActiveItemIdx, 0, newItem);
    setItems(newItems);
  };
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
  };
  const onDragStart = (e: DragStartEvent) => setActiveId(e.active.id);
  return {
    items,
    activeId,
    setActiveId,
    setItems,
    onDragOver,
    onDragEnd,
    onDragStart,
  };
};
export default useSortableList;
