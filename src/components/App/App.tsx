import { useState } from "react";
import css from "./App.module.css";

import { type VoteType, type Votes } from "./../../types/votes";
import CafeInfo from "./../CafeInfo/CafeInfo";
import VoteOptions from "./../VoteOptions/VoteOptions";
import VoteStats from "./../VoteStats/VoteStats";
import Notification from "./../Notification/Notification";

export default function App() {
  // Початковий стан votes оголошуємо без зовнішніх констант
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Ф-я handleVote для оновлення к-ті голосів
  const handleVote = (type: VoteType): void => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  // Ф-я resetVotes для скидання стану
  const resetVotes = (): void => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  // Обчислюємо загальну кількість голосів для передачі у пропси
  const totalVotes = votes.good + votes.neutral + votes.bad;

  // Обчислюємо відсоток позитивних відгуків (захищаємо від ділення на 0)
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  // Визначаємо чи показувати кнопку Reset
  const canReset = totalVotes > 0;

  return (
    <>
      <div className={css.app}>
        <CafeInfo />

        {/* Передаємо динамічне значення canReset */}
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={canReset}
        />

        {/* Умовний рендеринг залежно від значення totalVotes */}
        {totalVotes > 0 ? (
          <VoteStats
            votes={votes}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}
