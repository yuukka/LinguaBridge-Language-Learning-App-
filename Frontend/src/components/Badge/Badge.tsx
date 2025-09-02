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
import { getBadgeCollections } from '../../services/badgeService';

import { useUser } from '../../contexts/UserContext';

const Badge = () => {

    const { level } = useParams(); 
    
    const [message, setMessage] = useState('');
    // const [userAnswer, setUserAnswer] = useState([]);
    // const [questQuizs, setQuestQuizs] = useState([]);
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [badges, setBadges] = useState();
    
    // const navigate = useNavigate();

    const { user, updateUserLevel } = useUser();


const getBadgeFunciton = async (level) => {
    const requestType = 'GET';
    try {
        const badges = await getBadgeCollections(requestType, level)
        console.log("Fetched badges:", badges);
        setBadges(badges);
    } catch (err) {
        console.error("Unable to fetch badge:", err.message);
        setMessage("Unable to save fetch badge:");        
    }

};

    useEffect(() => {
        const userLve = parseInt(user?.level)
        getBadgeFunciton(userLve);
    }, [user]); 

    useEffect(() => {

    }, [badges]); 

  return (
    <> 
    {badges?.map((badge) => (
                <Card className="py-8 max-h-60 md:max-w-1/3 flex flex-row" key={badge.id} >
                    <CardHeader>
                        {badge.image && (
                            <img
                                src={badge.image}
                                alt=""
                                className="rounded-b-lg max-h-40 max-w-40"
                                id="quizImage"
                            />
                            )}
                    </CardHeader>
                    <div>
                        <CardContent className="gap-5">
                            <div>Hello</div>
                            <div>Hello</div>
                        </CardContent>
                        <CardFooter className="flex-col">
                        </CardFooter>
                    </div>

                </Card>
    )
     )}
        {/* <div className="flex items-center min-h-screen justify-center content-center items-center">

        </div> */}
    </>
  );
};

export default Badge;
