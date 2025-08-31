
// src/components/FavCard.tsx
import React, { useEffect, useState  } from "react";
import { useNavigate, Link } from 'react-router';
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

import { useUser } from '../../contexts/UserContext';

const QuestMap = () => {
    const { user, updateUserLevel } = useUser();

    const [userLevel, setUserLevel] = useState(1);
    const [maxLevel, setMaxLevel] = useState(10);
    const [levels, setLevels] = useState([]);        


    useEffect(() => {
        console.log(user)
    }, []); 


    const navigate = useNavigate();

    const startQuest = (levelNum) => {
        navigate(`/quiz/quest/${levelNum}`);
    };

  return (
    <div className="grid grid-cols-5 gap-4">
{
  Array.from({ length: maxLevel }).map((eachLevel, i) => {
    const levelNum = i + 1;
    //check the level (button comp) agains the current user level to see if the user comp is lower meaning already cleared it will be truty
    //  if not compare agains 1
    const isUnlocked = levelNum <= (user?.level || 1);
    
    return (
    <div key={i+1}>
        <button
        key={i+1}
        className={`p-4 rounded-lg text-white font-bold ${
            isUnlocked ? 'bg-blue-500/80' : 'bg-gray-400 cursor-not-allowed'
            }`}
        onClick={() => startQuest(user?.level)}
        disabled={!isUnlocked}
        >
        Level {i+1}
        </button>
    </div>

  );
  })
}


      {/* {Array.from({ length: maxLevel }).map((_, i) => {
        const levelNum = i + 1;
        const isUnlocked = levelNum <= (user?.level || 1);

        return (
          <button
            key={levelNum}
            className={`p-4 rounded-lg text-white font-bold ${
              isUnlocked ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isUnlocked}
            onClick={() => startQuest(levelNum)}
          >
            Level {levelNum}
          </button>
        );
      })} */}
    </div>
  );
};

export default QuestMap;
