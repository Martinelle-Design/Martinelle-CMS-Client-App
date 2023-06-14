import { createPortal } from "react-dom";
import { SortableListProps } from "../../../hooks/use-sortable-list";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { splitArray } from "../../helpers/splitArr";
import { SortableContext } from "@dnd-kit/sortable";
import { v4 as uuid } from "uuid";
const GridLayoutGrid = <T,>({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
  namespace,
  children,
  columns,
}: Partial<SortableListProps<T & { id: string }>> & {
  namespace: string;
  children: JSX.Element[];
  columns: number;
}) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  if (!items) return <></>;
  const itemElementMap = Object.fromEntries(
    Object.entries(children).map(([key, value]) => [value.key, value])
  );
  const colArr = Array(columns)
    .fill(0)
    .map((_) => ({ id: uuid() }));
  const itemsArr = splitArray(items, columns);
  const childrenArr = splitArray(children, columns);
  return (
    <div className={`${namespace}-grid-layout-grid`}>
      <div ref={(ref) => setContainerRef(ref)}></div>
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        {containerRef &&
          createPortal(
            <DragOverlay>
              {activeId ? itemElementMap[activeId] : null}
            </DragOverlay>,
            containerRef
          )}
        {colArr.map((e, idx) => (
          <SortableContext
            key={e.id}
            items={itemsArr[idx]}
            strategy={() => {
              return null;
            }}
          >
            {childrenArr[idx]}
          </SortableContext>
        ))}
      </DndContext>
    </div>
  );
};
export default GridLayoutGrid