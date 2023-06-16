import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableListProps } from "../../../hooks/use-sortable-list";
import { useState } from "react";
import { createPortal } from "react-dom";
export const BannerSortableDnDList = <T,>({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
  namespace,
  children,
  itemWrapper,
}: Partial<SortableListProps<T & { id: string }>> & {
  namespace: string;
  children: JSX.Element[];
  itemWrapper?: boolean;
}) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  if (!items) return <></>;
  const itemElementMap = Object.fromEntries(
    Object.entries(children).map(([key, value]) => [value.key, value])
  );
  return (
    <div className={`${namespace}-grid-list`}>
      <div
        ref={(ref) => setContainerRef(ref)}
        className="dnd-overlay-container"
      ></div>
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={() => {
            return null;
          }}
        >
          {itemWrapper ? (
            <div className="dnd-items-wrapper">{children}</div>
          ) : (
            children
          )}
        </SortableContext>
        {containerRef &&
          createPortal(
            <DragOverlay>
              {activeId ? itemElementMap[activeId] : null}
            </DragOverlay>,
            containerRef
          )}
      </DndContext>
    </div>
  );
};
