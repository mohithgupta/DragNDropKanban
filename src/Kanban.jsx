/* eslint-disable react/prop-types */
import { useState } from "react";
import { TrashCan } from "./TrashCan";
import { Column } from './Column';

export const Kanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);


  return (
    <div className="flex h-full w-full gap-3 p-12 border-solid border-slate-400">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
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
      <TrashCan setCards={setCards} />
    </div>
  );
};

const DEFAULT_CARDS = [
  // BACKLOG
  { 
    title: "Look into render bug in dashboard", 
    id: "1", 
    column: "backlog" 
  },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },

  // In Progress
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "inprogress",
  },
  // Complete
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "complete",
  },
];