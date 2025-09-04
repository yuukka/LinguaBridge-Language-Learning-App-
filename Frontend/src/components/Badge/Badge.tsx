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

import { userProfile } from '../../services/userService';

const Badge = () => {

    const { level } = useParams(); 
    
    const [message, setMessage] = useState('');
    const [badges, setBadges] = useState();

    const { user, updateUserLevel } = useUser();
    const [userPro, setUserProfile] = useState();

    const getProfile = async() => {
        const getProf = await userProfile(user?._id);
        setUserProfile(getProf);
    };

    const getBadgeFunciton = async (level) => {
        const requestType = 'GET';
        try {
            const badges = await getBadgeCollections(requestType, level)
            console.log("Fetched badges:", badges);
            badges.sort((a, b) => a.level - b.level);
            setBadges(badges);
        } catch (err) {
            console.error("Unable to fetch badge:", err.message);
            setMessage("Unable to save fetch badge:");        
        }

    };

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {

        if (userPro?.user?.level !== undefined) {
            getBadgeFunciton(userPro.user?.level);
            // console.log(userPro.user.level);
        }
    }, [userPro]); 

    useEffect(() => {
    
    // console.log(badges)
    }, [badges]);

  return (
    <> 
        <div className="flex flex-wrap justify-evenly gap-10 mt-10">
            {badges?.map((badge) => (
                // <Card className="py-8 max-h-60 max-w-4/5 md:max-w-2/5 md:w-2/5 md: max-h-80 md: md: h-80 flex flex-row justify-between md: justify-evenly bg-lime-200/85 " key={badge.id} >
                        <Card className="py-8 max-h-60 h-60 w-4/5 max-w-4/5 md:max-w-2/5 md:w-2/5 md:max-h-80 md:h-80 flex flex-row justify-between md:justify-evenly bg-lime-200/85 " key={badge.id} >
                            <CardHeader>
                                {badge.image && (
                                    <img
                                        src={badge.image}
                                        alt=""
                                        className="rounded-b-lg max-h-40 max-w-40 md:max-h-65"
                                        id="quizImage"
                                    />
                                    )}
                            </CardHeader>
                            <div>
                                <CardContent className="gap-5">
                                    <div>Name: {badge.name}</div>
                                    <div>Race: {badge.race}</div>
                                    <div>Ki: {badge.ki}</div>
                                    <div>Max Ki: {badge.maxKi}</div>
                                </CardContent>
                                <CardFooter className="flex-col">
                                </CardFooter>
                            </div>

                        </Card>
            )
            )}
                {/* <div className="flex items-center min-h-screen justify-center content-center items-center">

                </div> */}
        </div>
    </>
  );
};

export default Badge;
