import { createPortal } from "react-dom";
import { SortableListProps } from "../../../hooks/use-sortable-list";
import { useState, useEffect } from "react";
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
  const [colsArr, setColArr] = useState(
    Array(columns)
      .fill(0)
      .map((_) => ({ id: uuid() }))
  );
  useEffect(() => {
    setColArr((state) => {
      if (state.length < columns) {
        return [...state, { id: uuid() }];
      }
      if (state.length > columns) {
        return state.slice(0, columns);
      }
      return state;
    });
  }, [columns]);
  if (!items) return <></>;
  const itemElementMap = Object.fromEntries(
    Object.entries(children).map(([key, value]) => [value.key, value])
  );
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
        {colsArr.map((e, idx) => (
          <SortableContext
            key={e.id}
            items={itemsArr[idx]}
            strategy={() => {
              return null;
            }}
          >
            <div className="sortable-list-column">{childrenArr[idx]}</div>
          </SortableContext>
        ))}
      </DndContext>
    </div>
  );
};
export default GridLayoutGrid;
