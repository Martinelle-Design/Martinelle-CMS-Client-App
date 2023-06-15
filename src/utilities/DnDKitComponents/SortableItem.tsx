import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export function SortableItem({
  id,
  children,
  colIdx,
  totalColumns,
}: {
  id: string;
  children: JSX.Element | JSX.Element[] | string;
  colIdx?: number;
  totalColumns?: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      colIdx,
      totalColumns
    },
  });
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.6 : 1,
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    position: "relative",
    boxSizing: "border-box",
  };
  return (
    <div
      className="sortable-item"
      ref={(ref) => {
        setNodeRef(ref);
      }}
      style={style}
      {...attributes}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          boxSizing: "border-box",
        }}
        {...listeners}
      />
      {children}
    </div>
  );
}
