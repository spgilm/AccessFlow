/**
 * StudentGamesPanel
 *
 * Small, low-stimulation prototype games for the Student Mode Games tab.
 * Games are intentionally simple, touch-friendly, and label-first.
 */
import { useEffect, useMemo, useState } from "react";

const rpsChoices = [
  { id: "rock", label: "Rock", visual: "✊" },
  { id: "paper", label: "Paper", visual: "✋" },
  { id: "scissors", label: "Scissors", visual: "✌️" },
];

const defaultWheelChoices = [
  { color: "Red", label: "Red" },
  { color: "Blue", label: "Blue" },
  { color: "Yellow", label: "Yellow" },
  { color: "Green", label: "Green" },
  { color: "Purple", label: "Purple" },
  { color: "Orange", label: "Orange" },
];

const wordList = [
  "SMILE",
  "MUSIC",
  "APPLE",
  "WATER",
  "HAPPY",
  "TIGER",
  "PIZZA",
  "ROBOT",
  "BEACH",
  "LIGHT",
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const emptyTicTacToeBoard = Array.from({ length: 9 }, () => "");

const snakeGridSize = 8;

const memorySymbols = ["⭐", "❤️", "☀️", "🌙", "🎵", "🍎"];

function chooseRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeMemoryCards() {
  return shuffle([...memorySymbols, ...memorySymbols]).map((symbol, index) => ({
    id: `memory-${index}-${symbol}`,
    symbol,
    matched: false,
  }));
}

function checkTicTacToeWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every(Boolean) ? "tie" : "";
}

function makeSnakeStart() {
  return [
    { x: 3, y: 3 },
    { x: 2, y: 3 },
  ];
}

function getRandomSnakeFood(snake) {
  const occupied = new Set(snake.map((cell) => `${cell.x}-${cell.y}`));
  const openCells = [];

  for (let y = 0; y < snakeGridSize; y += 1) {
    for (let x = 0; x < snakeGridSize; x += 1) {
      if (!occupied.has(`${x}-${y}`)) {
        openCells.push({ x, y });
      }
    }
  }

  return chooseRandom(openCells);
}

function GameCard({ title, description, children }) {
  return (
    <section className="student-game-card" aria-label={title}>
      <div className="student-game-card-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function RockPaperScissorsGame() {
  const [result, setResult] = useState("Choose rock, paper, or scissors.");
  const [lastRound, setLastRound] = useState(null);

  function play(choice) {
    const computer = chooseRandom(rpsChoices);
    let outcome = "Tie game.";

    if (
      (choice.id === "rock" && computer.id === "scissors") ||
      (choice.id === "paper" && computer.id === "rock") ||
      (choice.id === "scissors" && computer.id === "paper")
    ) {
      outcome = "You win this round.";
    } else if (choice.id !== computer.id) {
      outcome = "Computer wins this round.";
    }

    setLastRound({ student: choice, computer });
    setResult(outcome);
  }

  return (
    <GameCard title="Rock Paper Scissors" description="Pick one. The computer picks one too.">
      <div className="game-choice-grid three-choice-grid">
        {rpsChoices.map((choice) => (
          <button key={choice.id} type="button" className="game-choice-button" onClick={() => play(choice)}>
            <span aria-hidden="true">{choice.visual}</span>
            <strong>{choice.label}</strong>
          </button>
        ))}
      </div>

      <div className="game-status-card" role="status">
        {lastRound ? (
          <p>
            You picked <strong>{lastRound.student.label}</strong>. Computer picked{" "}
            <strong>{lastRound.computer.label}</strong>.
          </p>
        ) : null}
        <strong>{result}</strong>
      </div>
    </GameCard>
  );
}

function ChoiceWheelGame() {
  const [wheelChoices, setWheelChoices] = useState(defaultWheelChoices);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [spinRotation, setSpinRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  function updateChoiceLabel(index, label) {
    setWheelChoices((current) =>
      current.map((choice, choiceIndex) => (choiceIndex === index ? { ...choice, label } : choice))
    );
  }

  function spinWheel() {
    if (isSpinning) {
      return;
    }

    const nextSelectedIndex = Math.floor(Math.random() * wheelChoices.length);
    const segmentSize = 360 / wheelChoices.length;
    const targetRotation = 360 * 5 + (360 - nextSelectedIndex * segmentSize - segmentSize / 2);

    setSelectedIndex(null);
    setIsSpinning(true);
    setSpinRotation((currentRotation) => currentRotation + targetRotation);

    window.setTimeout(() => {
      setSelectedIndex(nextSelectedIndex);
      setIsSpinning(false);
    }, 1400);
  }

  function resetLabels() {
    setWheelChoices(defaultWheelChoices);
    setSelectedIndex(null);
    setSpinRotation(0);
  }

  const selectedChoice = selectedIndex === null ? null : wheelChoices[selectedIndex];

  return (
    <GameCard
      title="Choice Wheel"
      description="Label the color spaces, then spin the wheel to pick one."
    >
      <div className="wheel-layout upgraded-wheel-layout">
        <div className="choice-wheel-stage">
          <span className="choice-wheel-pointer" aria-hidden="true">
            ▼
          </span>
          <div
            className={`choice-wheel spinning-choice-wheel ${isSpinning ? "is-spinning" : ""}`}
            aria-hidden="true"
            style={{ transform: `rotate(${spinRotation}deg)` }}
          >
            {wheelChoices.map((choice, index) => (
              <span key={choice.color} className={`wheel-chip wheel-chip-${index + 1}`}>
                {choice.label.trim().slice(0, 2) || choice.color.slice(0, 1)}
              </span>
            ))}
          </div>
        </div>

        <div className="wheel-controls">
          <button
            type="button"
            className="primary-wide-button"
            onClick={spinWheel}
            disabled={isSpinning}
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>

          <div className="game-status-card" role="status">
            <span>Result</span>
            <strong>{selectedChoice ? selectedChoice.label || selectedChoice.color : "No choice yet"}</strong>
            <p>{selectedChoice ? `${selectedChoice.color} space was selected.` : "Add labels, then spin."}</p>
          </div>

          <button type="button" className="secondary-button" onClick={resetLabels} disabled={isSpinning}>
            Reset labels
          </button>
        </div>
      </div>

      <div className="wheel-label-editor" aria-label="Edit wheel labels">
        {wheelChoices.map((choice, index) => (
          <label key={choice.color}>
            {choice.color} space
            <input
              type="text"
              value={choice.label}
              maxLength="20"
              onChange={(event) => updateChoiceLabel(index, event.target.value)}
              disabled={isSpinning}
            />
          </label>
        ))}
      </div>
    </GameCard>
  );
}

function WordRescueGame() {
  const [word, setWord] = useState(() => chooseRandom(wordList));
  const [guesses, setGuesses] = useState([]);

  const wrongGuesses = guesses.filter((letter) => !word.includes(letter));
  const rescued = word.split("").every((letter) => guesses.includes(letter));
  const outOfTries = wrongGuesses.length >= 6;

  function guessLetter(letter) {
    if (guesses.includes(letter) || rescued || outOfTries) {
      return;
    }

    setGuesses((current) => [...current, letter]);
  }

  function resetWord() {
    setWord(chooseRandom(wordList));
    setGuesses([]);
  }

  return (
    <GameCard title="Word Rescue" description="A kid-friendly word game. Guess letters to rescue the word.">
      <div className="word-rescue-display" aria-label="Word to guess">
        {word.split("").map((letter, index) => (
          <span key={`${letter}-${index}`}>{guesses.includes(letter) || outOfTries ? letter : "_"}</span>
        ))}
      </div>

      <div className="game-status-card" role="status">
        <span>Clouds</span>
        <strong>{wrongGuesses.length} / 6</strong>
        <p>
          {rescued
            ? "You rescued the word."
            : outOfTries
              ? `The word was ${word}. Try another one.`
              : "Pick a letter."}
        </p>
      </div>

      <div className="letter-grid" aria-label="Letter choices">
        {alphabet.map((letter) => (
          <button
            key={letter}
            type="button"
            onClick={() => guessLetter(letter)}
            disabled={guesses.includes(letter) || rescued || outOfTries}
            className={word.includes(letter) && guesses.includes(letter) ? "is-correct" : ""}
          >
            {letter}
          </button>
        ))}
      </div>

      <button type="button" className="secondary-button" onClick={resetWord}>
        New word
      </button>
    </GameCard>
  );
}

function TicTacToeGame() {
  const [board, setBoard] = useState(emptyTicTacToeBoard);
  const [turn, setTurn] = useState("X");
  const winner = checkTicTacToeWinner(board);

  function playSquare(index) {
    if (board[index] || winner) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = turn;
    setBoard(nextBoard);
    setTurn(turn === "X" ? "O" : "X");
  }

  function reset() {
    setBoard(emptyTicTacToeBoard);
    setTurn("X");
  }

  return (
    <GameCard title="Tic Tac Toe" description="Two-player X and O game. Take turns.">
      <div className="game-status-card" role="status">
        <strong>{winner === "tie" ? "Tie game." : winner ? `${winner} wins.` : `${turn}'s turn.`}</strong>
      </div>

      <div className="tic-tac-toe-board" aria-label="Tic Tac Toe board">
        {board.map((value, index) => (
          <button key={`square-${index}`} type="button" onClick={() => playSquare(index)}>
            {value || " "}
          </button>
        ))}
      </div>

      <button type="button" className="secondary-button" onClick={reset}>
        Reset board
      </button>
    </GameCard>
  );
}

function SnakeGame() {
  const initialSnake = useMemo(() => makeSnakeStart(), []);
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(() => getRandomSnakeFood(initialSnake));
  const [direction, setDirection] = useState("right");
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!running || gameOver) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];
        const nextHead = {
          x: head.x + (direction === "right" ? 1 : direction === "left" ? -1 : 0),
          y: head.y + (direction === "down" ? 1 : direction === "up" ? -1 : 0),
        };

        const hitWall =
          nextHead.x < 0 || nextHead.x >= snakeGridSize || nextHead.y < 0 || nextHead.y >= snakeGridSize;
        const hitSelf = currentSnake.some((cell) => cell.x === nextHead.x && cell.y === nextHead.y);

        if (hitWall || hitSelf) {
          setRunning(false);
          setGameOver(true);
          return currentSnake;
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...currentSnake];

        if (ateFood) {
          setScore((current) => current + 1);
          setFood(getRandomSnakeFood(nextSnake));
          return nextSnake;
        }

        nextSnake.pop();
        return nextSnake;
      });
    }, 430);

    return () => window.clearInterval(interval);
  }, [direction, food, gameOver, running]);

  function reset() {
    const nextSnake = makeSnakeStart();
    setSnake(nextSnake);
    setFood(getRandomSnakeFood(nextSnake));
    setDirection("right");
    setRunning(false);
    setGameOver(false);
    setScore(0);
  }

  function changeDirection(nextDirection) {
    const blocked =
      (direction === "up" && nextDirection === "down") ||
      (direction === "down" && nextDirection === "up") ||
      (direction === "left" && nextDirection === "right") ||
      (direction === "right" && nextDirection === "left");

    if (!blocked) {
      setDirection(nextDirection);
    }
  }

  const snakeCells = new Set(snake.map((cell) => `${cell.x}-${cell.y}`));

  return (
    <GameCard title="Snake" description="Move the snake to the snack. Do not hit the wall.">
      <div className="game-status-card" role="status">
        <span>Score</span>
        <strong>{score}</strong>
        {gameOver ? <p>Game over. Try again.</p> : null}
      </div>

      <div className="snake-board" aria-label="Snake game board">
        {Array.from({ length: snakeGridSize * snakeGridSize }, (_, index) => {
          const x = index % snakeGridSize;
          const y = Math.floor(index / snakeGridSize);
          const key = `${x}-${y}`;
          const isSnake = snakeCells.has(key);
          const isFood = food.x === x && food.y === y;

          return (
            <span key={key} className={isSnake ? "is-snake" : isFood ? "is-food" : ""}>
              {isSnake ? "●" : isFood ? "★" : ""}
            </span>
          );
        })}
      </div>

      <div className="snake-controls" aria-label="Snake controls">
        <button type="button" onClick={() => changeDirection("up")}>
          Up
        </button>
        <button type="button" onClick={() => changeDirection("left")}>
          Left
        </button>
        <button type="button" onClick={() => changeDirection("right")}>
          Right
        </button>
        <button type="button" onClick={() => changeDirection("down")}>
          Down
        </button>
      </div>

      <div className="row-actions">
        <button type="button" className="secondary-button" onClick={() => setRunning((current) => !current)}>
          {running ? "Pause" : "Start"}
        </button>
        <button type="button" className="secondary-button" onClick={reset}>
          Reset
        </button>
      </div>
    </GameCard>
  );
}

function DinoJumpGame() {
  const [running, setRunning] = useState(false);
  const [jumping, setJumping] = useState(false);
  const [obstacle, setObstacle] = useState(100);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!running || gameOver) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setObstacle((current) => {
        const next = current <= 0 ? 100 : current - 8;
        const inCollisionZone = next <= 18 && next >= 4;

        if (inCollisionZone && !jumping) {
          setRunning(false);
          setGameOver(true);
          return next;
        }

        if (next <= 0) {
          setScore((currentScore) => currentScore + 1);
        }

        return next;
      });
    }, 110);

    return () => window.clearInterval(interval);
  }, [gameOver, jumping, running]);

  function jump() {
    if (gameOver) {
      return;
    }

    setJumping(true);
    window.setTimeout(() => setJumping(false), 520);
  }

  function reset() {
    setRunning(false);
    setJumping(false);
    setObstacle(100);
    setScore(0);
    setGameOver(false);
  }

  return (
    <GameCard title="Dino Jump" description="Tap jump to hop over the block.">
      <div className="game-status-card" role="status">
        <span>Score</span>
        <strong>{score}</strong>
        {gameOver ? <p>Game over. Press reset to try again.</p> : null}
      </div>

      <div className="dino-game-stage" aria-hidden="true">
        <span className={`dino-player ${jumping ? "is-jumping" : ""}`}>🦖</span>
        <span className="dino-obstacle" style={{ left: `${obstacle}%` }}>
          ■
        </span>
      </div>

      <div className="row-actions">
        <button type="button" className="secondary-button" onClick={() => setRunning((current) => !current)}>
          {running ? "Pause" : "Start"}
        </button>
        <button type="button" className="primary-wide-button" onClick={jump} disabled={gameOver}>
          Jump
        </button>
        <button type="button" className="secondary-button" onClick={reset}>
          Reset
        </button>
      </div>
    </GameCard>
  );
}

function MemoryMatchGame() {
  const [cards, setCards] = useState(() => makeMemoryCards());
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [moves, setMoves] = useState(0);

  const matchedCount = cards.filter((card) => card.matched).length;
  const finished = matchedCount === cards.length;

  function reset() {
    setCards(makeMemoryCards());
    setSelectedCardIds([]);
    setMoves(0);
  }

  function selectCard(card) {
    if (card.matched || selectedCardIds.includes(card.id) || selectedCardIds.length >= 2) {
      return;
    }

    const nextSelected = [...selectedCardIds, card.id];
    setSelectedCardIds(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((current) => current + 1);
      const [first, second] = nextSelected.map((id) => cards.find((item) => item.id === id));

      if (first?.symbol === second?.symbol) {
        window.setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((item) =>
              item.id === first.id || item.id === second.id ? { ...item, matched: true } : item
            )
          );
          setSelectedCardIds([]);
        }, 350);
      } else {
        window.setTimeout(() => setSelectedCardIds([]), 800);
      }
    }
  }

  return (
    <GameCard title="Memory Match" description="Find matching picture pairs.">
      <div className="game-status-card" role="status">
        <span>Moves</span>
        <strong>{moves}</strong>
        {finished ? <p>All matches found.</p> : <p>Find two that match.</p>}
      </div>

      <div className="memory-grid" aria-label="Memory card grid">
        {cards.map((card) => {
          const isShown = card.matched || selectedCardIds.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              className={card.matched ? "is-matched" : isShown ? "is-shown" : ""}
              onClick={() => selectCard(card)}
              aria-label={isShown ? `Card showing ${card.symbol}` : "Hidden card"}
            >
              {isShown ? card.symbol : "?"}
            </button>
          );
        })}
      </div>

      <button type="button" className="secondary-button" onClick={reset}>
        New cards
      </button>
    </GameCard>
  );
}

function FloatBirdGame() {
  const [running, setRunning] = useState(false);
  const [birdY, setBirdY] = useState(48);
  const [pipeX, setPipeX] = useState(100);
  const [gapY, setGapY] = useState(45);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!running || gameOver) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setBirdY((current) => Math.min(88, current + 4));
      setPipeX((current) => {
        const next = current <= -8 ? 100 : current - 6;

        if (next <= -8) {
          setGapY(25 + Math.floor(Math.random() * 45));
          setScore((currentScore) => currentScore + 1);
        }

        return next;
      });
    }, 150);

    return () => window.clearInterval(interval);
  }, [gameOver, running]);

  useEffect(() => {
    if (!running || gameOver) {
      return;
    }

    const inPipeZone = pipeX < 24 && pipeX > 8;
    const outsideGap = birdY < gapY - 14 || birdY > gapY + 14;
    const hitGround = birdY >= 88;

    if ((inPipeZone && outsideGap) || hitGround) {
      setRunning(false);
      setGameOver(true);
    }
  }, [birdY, gameOver, gapY, pipeX, running]);

  function flap() {
    if (gameOver) {
      return;
    }

    setBirdY((current) => Math.max(8, current - 15));
  }

  function reset() {
    setRunning(false);
    setBirdY(48);
    setPipeX(100);
    setGapY(45);
    setScore(0);
    setGameOver(false);
  }

  return (
    <GameCard title="Float Bird" description="Tap flap to float through the open space.">
      <div className="game-status-card" role="status">
        <span>Score</span>
        <strong>{score}</strong>
        {gameOver ? <p>Game over. Try again.</p> : null}
      </div>

      <div className="float-bird-stage" aria-hidden="true">
        <span className="float-bird-player" style={{ top: `${birdY}%` }}>
          🐦
        </span>
        <span
          className="float-pipe top-pipe"
          style={{
            left: `${pipeX}%`,
            height: `${Math.max(8, gapY - 16)}%`,
          }}
        />
        <span
          className="float-pipe bottom-pipe"
          style={{
            left: `${pipeX}%`,
            top: `${Math.min(82, gapY + 16)}%`,
            height: `${Math.max(8, 100 - gapY - 16)}%`,
          }}
        />
      </div>

      <div className="row-actions">
        <button type="button" className="secondary-button" onClick={() => setRunning((current) => !current)}>
          {running ? "Pause" : "Start"}
        </button>
        <button type="button" className="primary-wide-button" onClick={flap} disabled={gameOver}>
          Flap
        </button>
        <button type="button" className="secondary-button" onClick={reset}>
          Reset
        </button>
      </div>
    </GameCard>
  );
}

export default function StudentGamesPanel() {
  const [activeGame, setActiveGame] = useState("rps");

  const games = [
    { id: "rps", label: "Rock Paper Scissors", component: <RockPaperScissorsGame /> },
    { id: "wheel", label: "Choice Wheel", component: <ChoiceWheelGame /> },
    { id: "word", label: "Word Rescue", component: <WordRescueGame /> },
    { id: "ttt", label: "Tic Tac Toe", component: <TicTacToeGame /> },
    { id: "snake", label: "Snake", component: <SnakeGame /> },
    { id: "dino", label: "Dino Jump", component: <DinoJumpGame /> },
    { id: "memory", label: "Memory Match", component: <MemoryMatchGame /> },
    { id: "float", label: "Float Bird", component: <FloatBirdGame /> },
  ];

  const currentGame = games.find((game) => game.id === activeGame) ?? games[0];

  return (
    <section className="student-games-panel" aria-labelledby="student-games-panel-heading">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Games</p>
          <h3 id="student-games-panel-heading">Pick a simple game</h3>
        </div>
      </div>

      <div className="game-picker-grid" aria-label="Choose a game">
        {games.map((game) => (
          <button
            key={game.id}
            type="button"
            className={activeGame === game.id ? "is-active" : ""}
            onClick={() => setActiveGame(game.id)}
            aria-pressed={activeGame === game.id}
          >
            {game.label}
          </button>
        ))}
      </div>

      {currentGame.component}
    </section>
  );
}
