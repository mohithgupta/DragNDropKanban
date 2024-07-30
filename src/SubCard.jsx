import { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { DropIndicatorLine } from './DropIndicatorLine';
import {deleteIcon} from './assets/images';

export const SubCard = ({ title, id, column, handleDragStart, setSubCards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [isDone, setIsDone] = useState(false);
  
  const textareaRef = useRef(null);

  const handleEditSave = () => {
    if(editTitle === ''){
      setIsEditing(false);
      setEditTitle(title)
      return;
    }

    setSubCards((prevSubCards) =>
      prevSubCards.map((SubCards) =>
        SubCards.id === id ? { ...SubCards, title: editTitle } : SubCards
      )
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave(e);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    });
  };
  
  const handleDoneClick = () => {
    setIsDone(prevDoneState =>!prevDoneState);
  };

  const handleDeleteclick = () => {
    setSubCards((prevSubCards) => prevSubCards.filter((SubCards) => SubCards.id!== id));
  };

  return (
    <>
      <DropIndicatorLine beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="sub-group relative cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        {isEditing && (
          <textarea
            type="text"
            ref={textareaRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            rows={3}
            className="absolute left-0 top-0 w-full resize-none p-2 text-neutral-100 bg-neutral-900"
            autoFocus
          />
        )}
        <p className={`text-sm text-neutral-100 break-words ${isDone && "line-through text-opacity-30"}`}>{title}</p>
        <button
          className={`absolute top-1 right-8 hidden ${!isEditing && "group-hover:inline"} invert border-[1px] w-6 rounded-[100%] bg-neutral-200 hover:bg-neutral-400`}
          onClick={handleDoneClick}
        >
          ✓
        </button>
        <button
          className={`absolute top-1 right-1 hidden ${!isEditing && "group-hover:inline"} invert border-[1px] w-6 rounded-[100%] bg-neutral-200 hover:bg-neutral-400`}
          onClick={handleEditClick}
        >
          ✎
        </button>
        <button
        className={`absolute top-1 left-1 hidden ${!isEditing && "group-hover:inline"} invert border-[1px] w-auto p-1 rounded-[100%] bg-neutral-200 hover:bg-neutral-400`}
        onClick={handleDeleteclick}
        >
        <img src={deleteIcon} alt="delete icon" />
        </button>
      </motion.div>
    </>
  );
};
