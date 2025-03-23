/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaFire } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';

export const TrashCanCard = ({ setCards }) => {
    const [active, setActive] = useState(false);
  
    const handleDragOver = (e) => {
      e.preventDefault();
      setActive(true);
    };
  
    const handleDragLeave = () => {
      setActive(false);
    };
  
    const handleDragEnd = (e) => {
      const cardId = e.dataTransfer.getData("cardId");
  
      setCards((pv) => pv.filter((c) => c.id !== cardId));
  
      setActive(false);
      localStorage.removeItem(`subCards-${cardId}`)
    };
  
    return (
      <div>
        <h3 className='font-medium text-red-600'>Drag here to Delete</h3>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mt-4 grid w-56 h-full shrink-0 place-content-center rounded border text-3xl ${
            active
              ? "border-red-800 bg-red-800/20 text-red-500"
              : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
          }`}
        >
          {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
      </div>
    );
  };
  