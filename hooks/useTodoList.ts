// hooks/useTodoList.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { Item } from '@/lib/types';

export function useTodoList(defaultItems: Item[]) {

  const [mainList, setMainList] = useState<Item[]>(defaultItems);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);

  const activeTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const executeAutoReturn = useCallback((itemToReturn: Item) => {
    console.log(`[Timer Callback] Executing auto-return for ${itemToReturn.name}`);
    activeTimersRef.current.delete(itemToReturn.name);
    setFruitList(prev => prev.filter(item => item.name !== itemToReturn.name));
    setVegetableList(prev => prev.filter(item => item.name !== itemToReturn.name));
    setMainList(prev => {
        if (!prev.some(item => item.name === itemToReturn.name)) {
            return [...prev, { name: itemToReturn.name, type: itemToReturn.type }];
        }
        return prev;
    });
     console.log(`[Timer Callback] State updated for ${itemToReturn.name} auto-return.`);
  }, []);

  const handleMoveToSide = useCallback((itemToMove: Item) => {
    setMainList(prev => prev.filter(item => item.name !== itemToMove.name));
    if (activeTimersRef.current.has(itemToMove.name)) {
        clearTimeout(activeTimersRef.current.get(itemToMove.name)!);
    }
    const timerId = setTimeout(() => {
       executeAutoReturn(itemToMove);
    }, 5000);
    activeTimersRef.current.set(itemToMove.name, timerId);
    if (itemToMove.type === 'Fruit') {
      setFruitList(prev => [...prev, itemToMove]);
    } else {
      setVegetableList(prev => [...prev, itemToMove]);
    }
     console.log(`Moved ${itemToMove.name} to side list. Timer ID ${timerId} stored in ref.`);
  }, [executeAutoReturn]);

  const handleMoveBack = useCallback((itemToMoveBack: Item) => {
    console.log(`[Manual Click] Attempting to move back: ${itemToMoveBack.name}`);
    if (activeTimersRef.current.has(itemToMoveBack.name)) {
        const timerId = activeTimersRef.current.get(itemToMoveBack.name)!;
        clearTimeout(timerId);
        activeTimersRef.current.delete(itemToMoveBack.name);
        console.log(`[Manual Click] Cleared timer ${timerId} for ${itemToMoveBack.name} and removed from ref.`);
    } else {
         console.log(`[Manual Click] No active timer found in ref for ${itemToMoveBack.name}.`);
    }
    setFruitList(prev => prev.filter(item => item.name !== itemToMoveBack.name));
    setVegetableList(prev => prev.filter(item => item.name !== itemToMoveBack.name));
    setMainList(prev => {
       if (!prev.some(item => item.name === itemToMoveBack.name)) {
           return [...prev, itemToMoveBack];
       }
       return prev;
    });
    console.log(`[Manual Click] State updates initiated for ${itemToMoveBack.name} manual return.`);
  }, []);

  useEffect(() => {
    const timers = activeTimersRef.current;
    return () => {
       console.log("Component unmounting. Clearing all active timers from ref...");
       timers.forEach((timerId, itemName) => {
          clearTimeout(timerId);
          console.log(`Cleared timer ${timerId} for ${itemName} on unmount.`);
       });
       timers.clear();
    };
  }, []);

  return {
    mainList,
    fruitList,
    vegetableList,
    handleMoveToSide,
    handleMoveBack,
  };
}