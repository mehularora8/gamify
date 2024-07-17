"use client"; 

import React, { useState, useEffect } from 'react';
import { FaAngleRight   } from 'react-icons/fa';
import { GoSkip } from "react-icons/go";
import Star from './star';

import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";

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
  const [message, setMessage] = useState('');
  const [hintIndex, setHintIndex] = useState(0);

  const [skippedWords, setSkippedWords] = useState([] as string[]);

  const obj = initialSecretWords.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<string, number>);
  const [userGuessCount, setUserGuessCount] = useState(obj); // Total guess count for each word

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const currentWord: string = secretWords[currentWordIndex];
  const currentHints = relatedWords[currentWord];

  const handleSkip = () => {
    setSkippedWords([...skippedWords, currentWord]);
    if (currentWordIndex < secretWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setHintIndex(0);
      setUserGuess('');
    } else {
      setGameOver(true);
      onOpen();
    }
  };

  const handleGuess = () => {
    if (userGuess.toLowerCase() === currentWord) { // Correct guess
      if (currentWordIndex === secretWords.length - 1) {
        setGameOver(true);
        setCurrentWordIndex(currentWordIndex + 1);
        onOpen();
      } else {
        setCurrentWordIndex(currentWordIndex + 1);
        setGuessCount(0);
        setHintIndex(0);
      }
    } else {
      const newGuessCount = guessCount + 1;
      setGuessCount(newGuessCount);
      if (newGuessCount >= 20) {
        setGameOver(true);
        onOpen();
      } else {
        setHintIndex((hintIndex + 1) % currentHints.length);
      }
    } 
    
    setUserGuess('');
  };

  useEffect(() => {
    setUserGuessCount({ ...userGuessCount, [currentWord]: guessCount + 1 });
  
  }, [guessCount, currentWord, currentWordIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  return (  
    <div className="flex flex-col justify-center items-center max-w-md mx-auto mt-10 p-6 bg-white rounded-lg select-none">
        
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
                  placeholder="Your guess"
                  className="mr-2 border p-2 rounded-lg"
                />
                <button onClick={handleGuess} type='submit'><FaAngleRight /></button>
                <button onClick={handleSkip} className='p-2'><GoSkip /></button>
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                {
                    secretWords.slice(0, currentWordIndex).map((word: string) => '✅ ')
                }
                {
                    secretWords.slice(currentWordIndex).map((word: string) => '⬜️ ')
                }
                  <p>
                    Share your results!
                  </p>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    </div>
  );
};

export default WordGuessingGame;

// TODO:
// - Add a modal that shows the results of the game.
// - What happens when someone needs to skip or goes more than 5 hints?
// - Add a way to share the results of the game.