// src/components/FavCard.tsx
import React, { useEffect, useState, useContext } from "react";
// import { useSearchResult, SearchResultProvider } from '../../contexts/WordResult';

import {jotabaSearch } from '../../services/jotabaSearch'
import { gifSearch } from '../../services/gifSearch'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { getWord, removeWord } from '../../services/wordService';

import { getQuickQuiz } from '../../services/quizService';

const QuickQuiz = () => {
//   const { keyword, results  } = useSearchResult();
  const [message, setMessage] = useState('');
  const [userAnswer, setUserAnswer] = useState([]);
  const [quickQuizs, setQuickQuizs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

    let getQuickQuizFunction = async () => {
    const requestType = 'GET';

    try {
        const quickQuizs = await getQuickQuiz(requestType);

        
        const shuffledQuizzes = quickQuizs.map(quiz => ({
        ...quiz,
        characters: shuffle([...quiz.characters]) // clone before shuffle
        }))   
        
        setQuickQuizs(shuffledQuizzes);  
    } catch (err) {
        console.error("Unable to save fetch Quiz:", err.message);
        setMessage("Unable to save fetch Quiz:");
    }
};

const handleCheckAnswer = () => {
  const currentWord = quickQuizs[currentIndex].word;
  if (userAnswer.join("") === currentWord) {
    setScore(score +1)
    setMessage("Correct!");
    setTimeout(() => {
      setMessage("");
      setUserAnswer([]);
      setCurrentIndex(currentIndex + 1); 
    }, 1000);
  } else {
    setMessage("Try again!");
  }
};

const resetAnswer = () => {
    setUserAnswer([]);
};


const shuffle = (questions) => {
  let currentIndex = questions.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Math random to generate number equal or more than 0 but less than 1, Math floor to rounds the result down to the nearest integer
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [questions[currentIndex], questions[randomIndex]] = [
      questions[randomIndex], questions[currentIndex]];

  }
  return questions;
};

    useEffect(() => {
        getQuickQuizFunction();
    }, []); 

    useEffect(() => {
        console.log(quickQuizs)
        if (quickQuizs.length > 0) {
        // reset when a new question (or set of questions) is loaded
        setUserAnswer([]);
  }
    }, [quickQuizs]); 

    useEffect(() => {
        
    }, [userAnswer]); 

    useEffect(() => {
        console.log(score) 
    if (currentIndex >= quickQuizs.length) {
        return;
    }
    if (quickQuizs.length > 0 && userAnswer.length === quickQuizs[currentIndex].word.length) {
        handleCheckAnswer();
    }
    }, [userAnswer]);





  return (
    <> 
        <div className="flex items-center min-h-screen justify-center">
        {currentIndex >= quickQuizs.length ? (
            <p>🎉 Quiz complete! Your score: {score}/{quickQuizs.length}</p>
        ) : quickQuizs.length > 0 && (
              
                <Card className="max-w-md min-w-sm py-8" key={quickQuizs[currentIndex].word} >
                    <CardHeader>
                        <CardTitle>{quickQuizs[currentIndex].imageUrl && (
                            <img
                                src={quickQuizs[currentIndex].imageUrl}
                                alt={quickQuizs[currentIndex].word}
                                className="rounded-b-lg"
                                id="quizImage"
                            />
                            )}</CardTitle>
                        <CardDescription>
                           {/* <b>[English]</b> <div id="englishWord">{quickQuiz.word}</div> */}
                           <>
                           </>
                            <div className="flex justify-center mb-4 space-x-2">
                                {Array.from({ length: quickQuizs[currentIndex].word.length }).map((_, i) => (
                                    <div key={i} className="w-10 h-10 border-b-2 text-center text-xl">
                                    {userAnswer[i] || ""}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mb-4 space-x-2">
                            {quickQuizs[currentIndex].characters.map((char, i) => (
                            <div>
                                <button key={i} onClick={() => setUserAnswer([...userAnswer, char])}>
                                    {char}
                                </button>
                            </div>
                            ))}
                            </div>


                        </CardDescription>
                    </CardHeader>
                    <div>
                        <CardContent className="gap-5">

                        </CardContent>
                        <CardFooter className="flex-col">
                            {/* <div className='bg-red-500/100'>{message}</div> */}
                            <div className=''>{message}</div>
                            {message === "Try again!" ? <button onClick={resetAnswer} className="bg-blue-500 text-white px-4 py-2 rounded">
                             Reset Answer
                            </button> :
                            <></>}
                        </CardFooter>
                    </div>

                </Card>
          )}
        </div>
    </>
  );
};

export default QuickQuiz;
