import { useState, useEffect } from "react";
import { TrashCanCard } from "./TrashCanCard";
import { Column } from './Column';
import useIsMobile from "./hooks/useIsMobile";

export const Kanban = () => {
  
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem('cards')) || DEFAULT_CARDS);
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards])
  
  return (
    <div className="flex w-full gap-3 p-12 pb-20 bg-neutral-900 border-solid border-slate-400">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="To-Do"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In-progress"
        column="inprogress"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="complete"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      {!isMobile && <TrashCanCard setCards={setCards} />}
    </div>
  );
};



const DEFAULT_CARDS = [
  // BACKLOG
  { 
    title: "Backlog tasks go here...never to be looked at again 👻", 
    id: "1", 
    column: "backlog" 
  },
  // TODO
  {
    title: "Todo tasks shall be put here...to be picked up I-don't-know-when 🤐",
    id: "2",
    column: "todo",
  },
  {
    title: "Enter -> Add the current task Ctrl/Shift + Enter -> Add the current task and open another task",
    id: "5",
    column: "todo",
  },

  // In Progress
  {
    title: "In-Progress tasks will stay here...for a while 😅",
    id: "3",
    column: "inprogress",
  },
  // Complete
  {
    title: "There's a legend saying that no task reaches here, especially if it's a side project...like this Kanban itself 🤧",
    id: "4",
    column: "complete",
  },
];