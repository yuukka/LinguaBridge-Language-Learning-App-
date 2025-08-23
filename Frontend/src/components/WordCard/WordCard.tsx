// src/components/WordCard.tsx
import React, { useEffect, useState, useContext } from "react";
import { useSearchResult, SearchResultProvider } from '../../contexts/WordResult';

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

import { UserContext } from '../../contexts/UserContext';
import { index } from '../../services/userService';

import { saveWord } from '../../services/wordService';

const WordCard = () => {
  const { keyword, results  } = useSearchResult();
  const [gifResults, setGifResults] = useState([]);
  const [message, setMessage] = useState('');
  const [savedWords, setSavedWords] = useState({});

  useEffect(() => {
    const fetchGifs = async () => {
      if (!results.words) return;

      const gifed = await Promise.all(
        results.words.map(async (result) => {
          let gifUrl = "";

          try {
            // Use the kana (or gloss) as keyword for GIF search 
            console.log(result.senses[0].glosses[0])
            const gifRes = await gifSearch(result.senses[0].glosses[0]);
            gifUrl = gifRes?.data?.[0]?.images?.original?.url || "";
          } catch (err) {
            console.error("GIF fetch failed:", err);
          }

          return { ...result, gifUrl };
        })
      );

      setGifResults(gifed);
    };

    fetchGifs();
  }, [results]);

    useEffect(() => {

  }, [gifResults]);

    const addFavFunction = async (event, result) => {

        const requestPayload = {
            kana: result.reading.kana,
            kanji: result.reading.kanji,
            gifImage: result.gifUrl,
            englishword: result.senses[0].glosses.join(),
        };
        const requestType = 'POST';

        try {
            await saveWord(requestType, requestPayload);
            setSavedWords((prev) => ({ ...prev, [result.reading.kana]: true }));
        } catch (err) {
            console.error("Unable to save fetch failed:", err.message);
            setMessage("Log in to Save!");
        }
    }

  return (
    <> 
        <div>🔍: {keyword}</div>
        <div className="flex flex-wrap justify-evenly gap-10">
          {gifResults.map((result) => (
              <div className='card' key={result.reading.kana + ', '+ result.senses[0].glosses.join(', ')} >
                {/* <p>{result.reading.kana}</p> */}
                <Card className="max-w-md min-w-sm min-h-full justify-between">
                    <CardHeader>
                        <CardTitle>{result.gifUrl && (
                            <img
                                src={result.gifUrl}
                                alt={result.reading.kana}
                                className="rounded-b-lg"
                                id="gifImage"
                            />
                            )}</CardTitle>
                        <CardDescription>
                           <b>[English]</b> <div id="englishWord">{result.senses[0].glosses.join()}</div>
                        </CardDescription>
                    </CardHeader>
                    <div>
                        <CardContent className="gap-5">
                            <div ><b>[Japanese - Kana]</b> <div id="kana">{result.reading.kana}</div>  </div> 
                                <br/>
                            <div><b>[Japanese - Kanji]</b>  <div id="kanji">{result.reading.kanji}</div>  </div> 
                        </CardContent>
                        <CardFooter className="flex-col">
                            <div className='text-red-500/100'>{message}</div>
                            <Button 
                            id='addFav'
                            type="submit" 
                            className="w-full" 
                            onClick={(e) => addFavFunction(e, result)}
                            disabled={!!savedWords[result.reading.kana]}>
                            Save
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

export default WordCard;
