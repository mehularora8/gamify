import WordGuessingGame from "./components/game";

import {NextUIProvider} from "@nextui-org/react";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { get } from "http";

export const revalidate = 0;
import Instructions from "./components/gameInstructions";

interface DatabaseRow {
  id: number;
  created_at: string;
  json_words: WordData;
}

interface WordData {
  [key: string]: string[];
};

const getDateForWords = () : string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

const fetchWordsByDate = async (table: string, date: string): Promise<WordData | null> => {
  const supabaseUrl = 'https://xucbswzhkwbwqcxybhfu.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Y2Jzd3poa3did3FjeHliaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNjg2NTcsImV4cCI6MjAzNzY0NDY1N30.i6q5KtzQb1VVPsAZByONaUeWgonuuEbhzd5VPerX4Fk';
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from(table)
      .select('json_words')
      .eq('created_at', date)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }

    return (data as DatabaseRow).json_words;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}

export default async function Home() {
  const relatedWords = await fetchWordsByDate('words', getDateForWords());

  if (!relatedWords) {
    return <div>No words available for today.</div>;
  }

  const secretWords = Object.keys(relatedWords);

  const relatedWordsObject = relatedWords as unknown as Record<string, string[]>;

  return (
    <NextUIProvider>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-8 mb-4 flex items-center justify-center">
          {/* Spacer -- realy need to find a way around this */}
          <div className='invisible'><Instructions/></div>
          20 Words Or Less 
          <Instructions/>
        </h1>
        <h2 className="text-xl text-gray-400 text-center">Guess the secrets in 20 guesses or less.</h2>
        <WordGuessingGame
          initialSecretWords={secretWords}
          initialRelatedWords={relatedWordsObject}
        />
      </div>
    </NextUIProvider>
  );
}