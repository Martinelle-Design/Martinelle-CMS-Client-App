import { SortableListProps } from "../../../hooks/use-sortable-list";
import {useState} from "react";
const GridLayoutGrid = <T,>({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
  namespace,
  children,
}: Partial<SortableListProps<T & { id: string }>> & {
  namespace: string;
  children: JSX.Element[];
}) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  if (!items) return <></>;
  return <></>;
};
