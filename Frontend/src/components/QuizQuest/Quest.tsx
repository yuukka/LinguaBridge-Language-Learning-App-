// src/components/FavCard.tsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
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

import { getQuest } from '../../services/quizService';
import { getBadge } from '../../services/badgeService';

import { useUser } from '../../contexts/UserContext';

const Quest = () => {
//   const { keyword, results  } = useSearchResult();
  const { level } = useParams(); 
  
  const [message, setMessage] = useState('');
  const [userAnswer, setUserAnswer] = useState([]);
  const [questQuizs, setQuestQuizs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [levelBadge, setLevelBadge] = useState();
  
  const navigate = useNavigate();

  const { user, updateUserLevel } = useUser();

  let getQuestQuizFunction = async () => {
    const requestType = 'GET';

    try {
        const questQuizs = await getQuest(requestType, level);
        console.log("Fetched quest quiz:", questQuizs);
        
        const shuffledQuizzes = questQuizs.map(quiz => ({
        ...quiz,
        characters: shuffle([...quiz.characters]) // clone before shuffle
        }))   
        
        setQuestQuizs(shuffledQuizzes);  
    } catch (err) {
        console.error("Unable to save fetch Quiz:", err.message);
        setMessage("Unable to save fetch Quiz:");
    }
};

const handleCheckAnswer = () => {
  const currentWord = questQuizs[currentIndex].word;
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

const getBadgeFunciton = async () => {
    const requestType = 'GET';

    try {
        const badge = await getBadge(requestType, level)
        console.log("Fetched badge:", badge);
        setLevelBadge(badge);
    } catch (err) {
        console.error("Unable to fetch badge:", err.message);
        setMessage("Unable to save fetch badge:");        
    }

};

const updateBadge = async () => {
    const updateLevel = await updateUserLevel(user?.level + 1);
    console.log(updateBadge)
    navigate(`/quiz/quest`);
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
        console.log(user?.level +1)
    }, []); 

    useEffect(() => {
        console.log(questQuizs)
        if (questQuizs.length > 0) {
        // reset when a new question (or set of questions) is loaded
        setUserAnswer([]);
  }
    }, [questQuizs]); 

    useEffect(() => {
        
    }, [userAnswer]); 

    useEffect(() => {
        console.log(score) 
        if (currentIndex >= questQuizs.length) {
            return;
        }
        if (questQuizs.length > 0 && userAnswer.length === questQuizs[currentIndex].word.length) {
            handleCheckAnswer();
        }
    }, [userAnswer]);


  useEffect(() => {
    if (level) {
      getQuestQuizFunction(parseInt(level)); 
      getBadgeFunciton(parseInt(level)); 
    }
  }, [level]);



  return (
    <> 
        <div className="flex items-center min-h-screen justify-center content-center items-center">
        {currentIndex >= questQuizs.length ? (
            <>
                <div className="flex flex-col items-center rounded-xl bg-lime-200/85 p-8">
                    <p>🎉 Quiz complete! Your score: {score}/{questQuizs.length}</p>
                    <img 
                        src={levelBadge?.image}
                        className="max-w-100 max-h-100"
                    ></img>
                    <button className="mt-4 bg-lime-900/85 text-white px-4 py-2 rounded" onClick={() => {
                    setScore(0);
                    setCurrentIndex(0);
                    updateBadge()
                    }}>
                    Back to Quest Map
                    </button> 
                </div>
               
            </>

        ) : questQuizs.length > 0 && (
              
                <Card className="max-w-md min-w-sm py-8" key={questQuizs[currentIndex].word} >
                    <CardHeader>
                        <CardTitle>{questQuizs[currentIndex].imageUrl && (
                            <img
                                src={questQuizs[currentIndex].imageUrl}
                                alt={questQuizs[currentIndex].word}
                                className="rounded-b-lg"
                                id="quizImage"
                            />
                            )}</CardTitle>
                        <CardDescription>
                           {/* <b>[English]</b> <div id="englishWord">{quickQuiz.word}</div> */}
                           <>
                           </>
                            <div className="flex justify-center mb-4 space-x-2">
                                {Array.from({ length: questQuizs[currentIndex].word.length }).map((_, i) => (
                                    <div key={i} className="w-10 h-10 border-b-2 text-center text-xl">
                                    {userAnswer[i] || ""}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mb-4 space-x-2">
                            {questQuizs[currentIndex].characters.map((char, i) => (
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

export default Quest;
