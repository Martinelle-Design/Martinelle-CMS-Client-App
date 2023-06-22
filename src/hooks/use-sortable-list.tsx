import { useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { v4 as uuid } from "uuid";
import { ClientAppItemProps } from "./use-client-app-items";
export type SortableListProps<T> = {
  items: T[];
  activeId: string | number | null;
  onDragEnd: (event: any) => void;
  onDragOver: (event: DragOverEvent) => void;
  onDragStart: (event: any) => void;
  setActiveId: React.Dispatch<React.SetStateAction<string | number | null>>;
  addItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  updateItem?: (
    e: React.FormEvent<HTMLFormElement>,
    update?: boolean
  ) => Promise<
    | {
        itemIdx: number;
        updateDatabaseItems?: (
          newItems: ClientAppItemProps<T>[]
        ) => Promise<void | PromiseSettledResult<any>[] | null>;
        data: {
          [k: string]: FormDataEntryValue;
        };
        setItems: React.Dispatch<
          React.SetStateAction<
            (T & {
              id: string;
            })[]
          >
        >;
        newItems: (T & {
          id: string;
        })[];
      }
    | undefined
  >;
  setItems: React.Dispatch<
    React.SetStateAction<
      (T & {
        id: string;
      })[]
    >
  >;
};
const useSortableList = <T,>({
  defaultArr,
  addItemFunc,
  updateItemFunc,
  customOnDragOver,
  updateDatabaseItems,
}: {
  defaultArr: (T & { id: string })[];
  addItemFunc?: (e?: { [k: string]: FormDataEntryValue }) => T | undefined;
  updateDatabaseItems?: (
    newItems: ClientAppItemProps<T>[]
  ) => Promise<void | PromiseSettledResult<any>[] | null>;
  updateItemFunc?: (e?: { [k: string]: FormDataEntryValue }) =>
    | {
        itemIdx: number;
        item: Partial<T>;
      }
    | undefined;
  customOnDragOver?: ({
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
  }) => void;
}): SortableListProps<T> => {
  const [items, setItems] = useState(defaultArr ? defaultArr : []);
  const [activeId, setActiveId] = useState<null | string | number>(null);
  const addItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!addItemFunc) return;
    const newItem = addItemFunc();
    if (!newItem) return;
    const containsId = (e: any): e is T & { id: string } => {
      try {
        return e.id;
      } catch (err) {
        return false;
      }
    };
    if (containsId(newItem))
      setItems([newItem as T & { id: string }, ...items]);
    else setItems([{ ...newItem, id: uuid() }, ...items]);
  };
  const updateItem = async (
    e: React.FormEvent<HTMLFormElement>,
    update?: boolean
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (!updateItemFunc) return;
    const result = updateItemFunc(data);
    if (!result) return;
    const { itemIdx, item } = result;
    if (!item || (!itemIdx && itemIdx !== 0)) return;
    const newItems = [...items];
    const oldItem = newItems[itemIdx];
    newItems[itemIdx] = { ...oldItem, ...item, id: oldItem.id };
    if (update) {
      setItems(newItems);
      if (updateDatabaseItems)
        updateDatabaseItems(newItems as ClientAppItemProps<T>[]);
    } else
      return {
        setItems,
        newItems,
        updateDatabaseItems,
        itemIdx,
        data,
      };
  };

  const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const dataset = e.currentTarget.dataset;
    const id = dataset.id;
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };
  const defaultDragOver = (e: DragOverEvent) => {
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
    const newItem = items.find(
      (item) => item.id === activeId
    ) as ClientAppItemProps<T>;
    newItem.orderIdx = newActiveItemIdx;
    if (!newItem) return;
    newItems.splice(activeItemIdx, 1);
    newItems.splice(newActiveItemIdx, 0, newItem);
    setItems(newItems);
  };
  const onDragOver = (e: DragOverEvent) => {
    if (customOnDragOver)
      return customOnDragOver({
        e,
        items,
        setItems,
      });
    defaultDragOver(e);
  };
  const onDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
  };
  const onDragStart = (e: DragStartEvent) => setActiveId(e.active.id);
  return {
    items,
    activeId,
    addItem,
    deleteItem,
    updateItem,
    setActiveId,
    setItems,
    onDragOver,
    onDragEnd,
    onDragStart,
  };
};
export default useSortableList;
