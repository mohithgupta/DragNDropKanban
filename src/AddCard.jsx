import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { FiPlus } from 'react-icons/fi';

export const AddCard = ({ column, setCards }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
    const addCardRef = useRef(null);

    const handleKeyDown = (e) => {
      if((e.ctrlKey || e.shiftKey) && e.key==='Enter'){ 
        e.stopPropagation();
        e.preventDefault();
        handleSubmit(e);
        setAdding(true);
      }
      else if(!e.shiftKey && e.key === 'Enter') handleSubmit(e);
    }

    const handleChange = (e) => {
      setText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!text.trim().length) return;
  
      const newCard = {
        column,
        title: text.trim(),
        id: Math.random().toString(),
      }

      const newSubCard = {
        column,
        title: text.trim(),
        id: Math.random().toString(),
        isDone: false
      }

      setCards((pv) => [...pv, isNaN(column) ? newCard : newSubCard]);
  
      setAdding(false);
      setText('');
    };
    
    useEffect(() => {
      function handleClickOutside(event) {
        if (addCardRef.current && !addCardRef.current.contains(event.target)) {
          setAdding(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <>
        {adding ? (
          <motion.form layout onSubmit={handleSubmit} ref={addCardRef}>
            <input
              type='text'
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={text}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            layout
            onClick={() => setAdding(true)}
            className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
          >
            <span>Add {`${!isNaN(column) ? "Sub-" : ''}`}Task</span>
            <FiPlus />
          </motion.button>
        )}
      </>
    );
  };



  
