import { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { DropIndicatorLine } from './DropIndicatorLine';
import { SubColumn } from './Subcolumn';
import { deleteIcon } from './assets/images';

export const Card = ({ title, id, column, handleDragStart, setCards, setdragActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [width, setWidth] = useState(window.innerWidth);
  
  const [subCards, setSubCards] = useState(JSON.parse(localStorage.getItem(`subCards-${id}`)) || []);

  const textareaRef = useRef(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    localStorage.setItem(`subCards-${id}`, JSON.stringify(subCards));
  }, [id, subCards])

const isMobile = width <= 768;

  const handleEditSave = () => {
    if(editTitle === ''){
      setIsEditing(false);
      setEditTitle(title)
      return;
    }
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, title: editTitle } : card
      )
    );
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave(e);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setdragActive(false);
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    });
  };

  const handleDeleteclick = () => {
    setCards((prevCards) => prevCards.filter((card) => card.id!== id));
  };

  return (
    <>
      <DropIndicatorLine beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="group relative cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
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
        <p className="text-sm text-neutral-100 break-words mb-2">{title}</p>
        <button
          className={`absolute top-1 right-1 hidden ${!isEditing && "group-hover:inline"} invert border-[1px] w-6 rounded-[100%] bg-neutral-200 hover:bg-neutral-400`}
          onClick={handleEditClick}
        >
          ✎
        </button>
        {isMobile && 
          <button
            className={`absolute top-1 left-1 hidden ${!isEditing && "group-hover:inline"} invert border-[1px] w-6 rounded-[100%] bg-neutral-200 hover:bg-neutral-400`}
            onClick={handleDeleteclick}
          >
          <img src={deleteIcon} alt="delete icon" />
          </button>}
          <SubColumn title="SubTasks:" subCards={subCards} setSubCards={setSubCards} id={id}/>
      </motion.div>
          
    </>
  );
};
