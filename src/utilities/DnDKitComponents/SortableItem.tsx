import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export function SortableItem({
  id,
  children,
}: {
  id: string;
  children: JSX.Element | JSX.Element[] | string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    // backgroundColor: isOver ? "gray" : undefined,
    transition,
  };

  return (
    <div
      className="sortable-item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
