/* eslint-disable react/prop-types */

import { useState } from 'react';
import { DropIndicatorLine } from './DropIndicatorLine';
import { SubCard } from './SubCard';
import { AddCard } from './AddCard';

export const SubColumn = ({ title, subCards, id, setSubCards }) => { 
    const [dragActive, setdragActive] = useState(false);
  
    const handleDragStart = (e, card) => {
      e.dataTransfer.setData("cardId", card.id);
    };
  
    const handleDragEnd = (e) => {
      const cardId = e.dataTransfer.getData("cardId");
  
      setdragActive(false);
  
      const indicators = getIndicators();
      const { element } = getNearestIndicator(e, indicators);
  
      const before = element.dataset.before || "-1";
  
      if (before !== cardId) {
        let subCardsCopy = [...subCards];
  
        let cardToTransfer = subCardsCopy.find((c) => c.id === cardId);
        if (!cardToTransfer) return;
        cardToTransfer = { ...cardToTransfer, id };
  
        subCardsCopy = subCardsCopy.filter((c) => c.id !== cardId);
  
        const moveToBack = before === "-1";
  
        if (moveToBack) {
          subCardsCopy.push(cardToTransfer);
        } else {
          const insertAtIndex = subCardsCopy.findIndex((el) => el.id === before);
          if (insertAtIndex === undefined) return;
  
          subCardsCopy.splice(insertAtIndex, 0, cardToTransfer);
        }
  
        setSubCards(subCardsCopy);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
  
      setdragActive(true);
    };
    
    const getNearestIndicator = (e, indicators) => {
      const DISTANCE_OFFSET = 50;
  
      const el = indicators.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
  
          const offset = e.clientY - (box.top + DISTANCE_OFFSET);
  
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
          element: indicators[indicators.length - 1],
        }
      );
  
      return el;
    };
  
    const getIndicators = () => {
      return Array.from(document.querySelectorAll(`[data-column="${id}"]`));
    };
  
    const handleDragLeave = () => {
      setdragActive(false);
    };

    return (
      <div>
        <div className="mb-3 flex items-center justify-between pr-4 pl-2">
          {/* <h3 className={`font-medium mt-2 text-neutral-700`}>{title}</h3> */}
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors ${
            dragActive ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
        >
          {subCards.map((card) => <SubCard key={card.id} {...card} handleDragStart={handleDragStart} setSubCards={setSubCards} />)}
          <DropIndicatorLine beforeId={null} />
          <AddCard column={id} setCards={setSubCards} />
        </div>
      </div>
    );
  };