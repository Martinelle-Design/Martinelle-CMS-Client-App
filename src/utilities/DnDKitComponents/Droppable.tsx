import { useDroppable } from "@dnd-kit/core";

export function Droppable({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "gray" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
