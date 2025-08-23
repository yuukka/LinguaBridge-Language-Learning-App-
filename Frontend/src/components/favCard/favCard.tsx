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

const FavCard = () => {
//   const { keyword, results  } = useSearchResult();
  const [gifResults, setGifResults] = useState([]);
  const [message, setMessage] = useState('');
  const [myResults, setMyResults] = useState([]);
  const [savedWords, setSavedWords] = useState({}); 
  const [removedWords, setRemovedWords] = useState({}); 

        // Get the full list of "Favorite Words" that the user saved
    let getFavListFunction = async () => {
        const requestType = 'GET';

        try {
            const getWords = await getWord(requestType);
            setMyResults(getWords);       
        } catch (err) {
            console.error("Unable to save fetch failed:", err.message);
            setMessage("Log in to Save!");
        }
    };

    const removeFavFunction = async (event, result) => {
        const requestType = 'DELETE';
        const recordID = result._id
        try {
            const getWords = await removeWord(requestType, recordID);
            setRemovedWords(getWords);       
        } catch (err) {
            console.error("Unable to remove fav:", err.message);
            setMessage("Log in to Save!");
        }
    };



    useEffect(() => {
        getFavListFunction();
    }, []); 

    useEffect(() => {
        console.log(myResults);
    }, [myResults]); 

    useEffect(() => {
        getFavListFunction();
    }, [removedWords]); 

  return (
    <> 
        <div></div>
        <div className="flex flex-wrap justify-evenly gap-10">
          {myResults.map((result) => (
              <div className='card' key={result.kana + ', '+ result.englishword} >
                {/* <p>{result.reading.kana}</p> */}
                <Card className="max-w-md min-w-sm min-h-full justify-between">
                    <CardHeader>
                        <CardTitle>{result.gifImage && (
                            <img
                                src={result.gifImage}
                                alt={result.kana}
                                className="rounded-b-lg"
                                id="gifImage"
                            />
                            )}</CardTitle>
                        <CardDescription>
                           <b>[English]</b> <div id="englishWord">{result.englishword}</div>
                        </CardDescription>
                    </CardHeader>
                    <div>
                        <CardContent className="gap-5">
                            <div ><b>[Japanese - Kana]</b> <div id="kana">{result.kana}</div>  </div> 
                                <br/>
                            <div><b>[Japanese - Kanji]</b>  <div id="kanji">{result.kanji}</div>  </div> 
                        </CardContent>
                        <CardFooter className="flex-col">
                            <div className='bg-red-500/100'>{message}</div>
                            <Button 
                            id='removeFav'
                            type="submit" 
                            className="w-full bg-red-500/90"
                            onClick={(e) => removeFavFunction(e, result)}
                            disabled={!!removedWords[result.kana]}>
                            Remove
                            </Button>
                        </CardFooter>
                    </div>

                </Card>
              </div>
          ))}
        </div>
    </>
  );
};

export default FavCard;
