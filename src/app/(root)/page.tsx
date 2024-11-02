"use client";
import { Input } from "@/components/ui/input";
import { GameState } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const initialGameState :GameState = {
  playerTurn : "player1",
  player1Score: 0,
  player2Score: 0,
  words: [],
  lastWord: '',
  entries: [],
}
export default function Home() {
  const [playerInput, setPlayerInput] = useState("");
  const [playerScore] = useState(100);
  const [aiScore] = useState(100);
  const [error, setError] = useState("");
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [timer, setTimer] = useState(10)
  const [isValid, setIsValid] = useState('')
  useEffect(()=> {
    if(timer> 0) {
      const countdown = setInterval(()=> setTimer(prev => prev-1), 1000)
      return () => clearInterval(countdown)
    } else{
      handleTurnSwitch()
    }
  },[timer])
  const handleTurnSwitch =()=> {
    setGameState(prev => ({
      ...prev,
      playerTurn: prev.playerTurn ==="player1" ? "player2": "player1"
    }))
    setTimer(10)
  }

  const validateWord =async (word: string)=>{
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const isUnique = gameState.words.includes(playerInput)
    const isMinLength = playerInput.length >= 4
    const matchesLastLetter = gameState.lastWord === "" ||
 playerInput[0].toLowerCase() === gameState.lastWord.slice(-1).toLowerCase()   

    let scoreChange = 0
    if(!isMinLength){
      setError("at least 4 characters long")
      scoreChange =- 1
    }else if (!matchesLastLetter){
      setError("word must start with the last letter of previous word")
      scoreChange=-1
    }else {
      const inValid = await validateWord(playerInput);
      if(!isValid){
        setError("Not a valid word")
        scoreChange=-1
      }else{
        setError("")
        scoreChange =1
      }
    }



  setPlayerInput("");
  };
  return (
    <main className="container mx-auto p-8 flex flex-col md:flex-row gap-8 justify-center items-start">
      <div className="w-full md:w-96 bg-[#2a2a2a] p-6 rounded-lg border border-[#3a3a3a] relative overflow-hidden text-white">
        <div className="flex items-center gap-4 mb-6">
          <FaUser className="w-8 h-8" />
          <span className="text-xl">Player 1</span>
        </div>
        <div className="flex justify-around items-center">
          <div className="text-6xl mb-6 text-white">
            {gameState.player1Score}
          </div>
          <div className="text-white"> Time remaining: {timer} seconds</div>
        </div>
        {gameState.playerTurn === "player1" && (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              className="bg-[#1c1c1c] border-[#3a3a3a] text-white"
              placeholder="Enter a word and hit enter"
            />
          </form>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div>
        <ul>
          {
            gameState.entries.map((entry, index)=> (
              <li key={index}>
                <span>{entry.word}</span>
                <span>{entry.score}</span>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="w-full md:w-96 bg-[#2a2a2a] p-6 rounded-lg border border-[#3a3a3a] relative overflow-hidden text-white">
        <div className="flex items-center gap-4 mb-6">
          <FaUser className="w-8 h-8" />
          <span className="text-xl">Player 2</span>
        </div>
        <div className="flex justify-around items-center">
          <div className="text-6xl mb-6 text-white">
            {gameState.player2Score}
          </div>
          <div className="text-white"> Time remaining: {timer} seconds</div>
        </div>
        {gameState.playerTurn === "player2" && (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              className="bg-[#1c1c1c] border-[#3a3a3a] text-white"
              placeholder="Enter a word and hit enter"
            />
          </form>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </main>
  );
}
