import { SubCard } from './SubCard';
import { AddCard } from './AddCard';
import { DropIndicatorLine } from './DropIndicatorLine';

export const SubColumn = ({ subCards, id, setSubCards }) => { 
   
    return (
      <div>
        <div
          className="h-full w-full transition-colors bg-neutral-800/50"
        >
          {subCards.map((subCard) => <SubCard key={subCard.id} {...subCard} setSubCards={setSubCards} />)}
          <DropIndicatorLine beforeId={null} />
          <AddCard column={id} setCards={setSubCards} />
        </div>
      </div>
    );
  };