
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

import { userProfile } from '../../services/userService';

const QuestMap = () => {
    const { user, updateUserLevel } = useUser();

    const [userLevel, setUserLevel] = useState(1);
    const [maxLevel, setMaxLevel] = useState(10);
    const [levels, setLevels] = useState([]);        
    const [userPro, setUserProfile] = useState();

    const getProfile = async() => {
    const getProf = await userProfile(user?._id);
    setUserProfile(getProf);
    console.log(getProf);
    };

    useEffect(() => {
        console.log(userPro)
    }, [userPro]); 

    useEffect(() => {
        getProfile();
    }, []);

    const navigate = useNavigate();

    const startQuest = (levelNum) => {
        navigate(`/quiz/quest/${levelNum + 1}`);
    };

  return (
    <div className="grid grid-cols-5 gap-4">
{
  Array.from({ length: maxLevel }).map((eachLevel, i) => {
    const levelNum = i;
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

    </div>
  );
};

export default QuestMap;
