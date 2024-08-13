"use client"; 

import React, { useState, useEffect, use } from 'react';
import { FaAngleRight, FaCheck, FaCopy, FaTwitter, FaQuestion, FaQuestionCircle } from 'react-icons/fa';
import { GoSkip } from "react-icons/go";

import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";

import { Button } from "@nextui-org/button";

interface WordGuessingGameProps {
  initialSecretWords: string[];
  initialRelatedWords: Record<string, string[]>;
}

const WordGuessingGame: React.FC<WordGuessingGameProps> = ({ initialSecretWords, initialRelatedWords }) => {
  const [secretWords, setSecretWords] = useState(initialSecretWords);
  const [relatedWords, setRelatedWords] = useState(initialRelatedWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessCount, setGuessCount] = useState(0); // Guess count for current word
  const [gameOver, setGameOver] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [totalGuessCount, setTotalGuessCount] = useState(0);

  const [skippedWords, setSkippedWords] = useState([] as string[]);

  const initialUserGuessCount = initialSecretWords.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<string, number>);
  const [userGuessCount, setUserGuessCount] = useState(initialUserGuessCount); // Total guess count for each word

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const currentWord: string = secretWords[currentWordIndex];
  const currentHints = relatedWords[currentWord];

  const handleSkip = () => {
    setSkippedWords((prevSkippedWords) => [...prevSkippedWords, currentWord]);
    setUserGuessCount((prevCount) => ({
      ...prevCount,
      [currentWord]: guessCount,
    }));

    if (currentWordIndex < secretWords.length - 1) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setHintIndex(0);
      setUserGuess("");
      setGuessCount(0);
    } else {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setGameOver(true);
      onOpen();
    }
  };

  const handleGuess = () => {
    if (userGuess === "") {
      return;
    }

    let newTotalGuessCount = totalGuessCount + 1;
    setTotalGuessCount(newTotalGuessCount);

    if (userGuess.trim().toLowerCase() === currentWord.toLowerCase()) {
      // Correct guess
      setUserGuessCount((prevCount) => ({
        ...prevCount,
        [currentWord]: guessCount + 1,
      }));

      if (currentWordIndex === secretWords.length - 1) {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setGameOver(true);
        onOpen();
      } else {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setHintIndex(0);
      }

      setGuessCount(0);
    } else {
      const updatedGuessCount = guessCount + 1;
      setGuessCount(updatedGuessCount);
      setUserGuessCount((prevCount) => ({
        ...prevCount,
        [currentWord]: updatedGuessCount,
      }));

      if (newTotalGuessCount >= 20) {
        
        setGameOver(true);
        onOpen();
      } else {
        setHintIndex((prevHintIndex) => (prevHintIndex + 1) % currentHints.length);
      }
    }

    setUserGuess("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  const createTweet = () => {
    const modalText = `20 Words Or Less, ${formatTodayDate()}:\n\n${createEmojiString(userGuessCount, skippedWords)}\n\nBeat my score at: https://20wordsorless.xyz`;
    const tweetText = encodeURIComponent(modalText);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  const copyToClipboard = () => {
    const modalText = `20 Words Or Less ${formatTodayDate()} \n ${createEmojiString(userGuessCount, skippedWords)}\n\nBeat my score at: https://20wordsorless.xyz`;
    navigator.clipboard.writeText(modalText);
  };

  const createEmojiString = (userGuessCount: Record<string, number>, skippedWords: string[]): string => {
    return Object.entries(userGuessCount).map(([word, count]) => {
      if (skippedWords.includes(word)) {
        return '❌'; // Skipped word
      } else if (count === 1) {
        return '1️⃣'; // Guessed in 1 attempt
      } else if (count === 2) {
        return '2️⃣'; // Guessed in 2-5 attempts
      } else if (count === 3) {
        return '3️⃣'; // Guessed in 2-5 attempts
      } else if (count === 4) {
        return '4️⃣'; // Guessed in 2-5 attempts
      } else if (count === 5) {
        return '5️⃣'; // Guessed in 2-5 attempts
      }
    }).join('');
  }

  const formatTodayDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const today = new Date();
    const dayName = days[today.getDay()];
    const monthName = months[today.getMonth()];
    const date = today.getDate();
    const year = today.getFullYear();
  
    return `${dayName}, ${monthName} ${date} ${year}`;
  }

  const getRemainingGuesses = () => {
    const remaining = Object.values(userGuessCount).reduce((acc, count) => acc + count, 0);
    return `${20 - remaining} guesses left`;
  }

  return (  
    <div className="flex flex-col justify-center items-center max-w-md mx-auto mt-6 p-6 bg-white rounded-lg select-none">
        {!gameOver ? (
            <>  
                <div className="flex flex-col mb-2 text-stone-900 text-4xl mb-8 min-w-[100%]">
                    <div className='flex items-center justify-center'>
                      {
                        currentHints.slice(0, hintIndex).map((hint: string, i) => (
                          <div key={i} className='flex items-center justify-center text-sm text-slate-900 my-1 p-[1%] min-w-6 min-h-3 bg-orange-100 mr-2'>
                            {hint.toUpperCase()}
                          </div>
                        ))
                      }
                    </div>
                    <div className='flex items-center justify-center'>
                      <div className='flex items-center justify-center'>  HINT:&nbsp; </div>

                      <div className='flex items-center justify-center text-slate-900 my-1 p-[1%] min-w-6 min-h-3 bg-orange-300 font-bold'>
                        {currentHints[hintIndex].toUpperCase()}
                      </div>
                    </div>
                </div>
                <div className="flex mb-4">
                    <input
                      type="text"
                      value={userGuess}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setUserGuess(e.target.value)}
                      placeholder={getRemainingGuesses()}
                      className="mr-2 border p-2 rounded-lg"
                    />
                    <button onClick={handleGuess} className='px-4' type='submit'><FaAngleRight /></button>
                    <button onClick={handleSkip} className='px-4'><GoSkip /></button>
                </div>
            </>
          ) : 
          <> </>
        }
        {
            <div className='flex flex-col items-start text-xl min-w-full'>
                {
                  secretWords.slice(0, currentWordIndex).map((word: string, i) => 
                    <div key={i} className='flex items-center justify-between min-w-full'> 
                      {
                        skippedWords.includes(word) ? '❌' : <p className='font-bold'> { userGuessCount[word] }</p>
                      }
                      
                      <div className='flex'>
                        <div className='flex items-center justify-center text-slate-900 my-1 px-1 min-w-6 min-h-3 bg-sky-300 font-bold'>
                          { word.toUpperCase() }
                        </div>
                      </div>
                    </div>
                    )
                }
              
                {
                  secretWords.slice(currentWordIndex).map((word: string, i) => 
                    <div key={i} className='flex items-center justify-between min-w-full'> 
                      <p> {'⬜️ '}</p>
                      <div className='flex'>
                        <div className='flex items-center justify-center text-gray-300 my-1 px-1 min-w-6 min-h-3 bg-gray-300 font-bold'>
                          {word.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  )
                }
            </div>
        }
        <Modal 
          isDismissable={false} 
          isKeyboardDismissDisabled={true}  
          backdrop="opaque" 
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className="flex flex-col text-3xl font-bold text-center mt-8">
                  20 Words Or Less 
                  <span className="text-xl text-center font-semibold text-gray-600 mt-3">{formatTodayDate()}</span>
                </ModalHeader>
                <ModalBody className='font-xl flex flex-col text-center'>
                {
                  `${createEmojiString(userGuessCount, skippedWords)}`
                }
                <span>Challenge your friends!</span>
                
                </ModalBody>
                <ModalFooter>
                  <Button onPress={copyToClipboard}><FaCopy/></Button>
                  <Button onPress={createTweet}><FaTwitter /></Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>        
    </div>
  );
};

export default WordGuessingGame;

// TODO:
// - Tell user there's no more hints for given word.
// - Uhhhh move supabase key etc to server side?
// - RLS on supabase is fucked
// - localstorage for day's results