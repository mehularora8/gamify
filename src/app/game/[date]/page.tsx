import WordGuessingGame from "../../components/game";
import Instructions from "../../components/gameInstructions";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface DatabaseRow {
  id: number;
  created_at: string;
  json_words: WordData;
  event: string;
}

interface WordData {
  [key: string]: string[];
}

const fetchWordsByDate = async (table: string, date: string): Promise<DatabaseRow | null> => {
  const supabaseUrl = 'https://xucbswzhkwbwqcxybhfu.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Y2Jzd3poa3did3FjeHliaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNjg2NTcsImV4cCI6MjAzNzY0NDY1N30.i6q5KtzQb1VVPsAZByONaUeWgonuuEbhzd5VPerX4Fk';
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('created_at', date)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }

    return (data as DatabaseRow);
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}

export default async function GamePage({ params }: { params: { date: string } }) {
  const wordData = await fetchWordsByDate('words', params.date);

  if (!wordData || !wordData.json_words) {
    return <div>No words available for the selected date.</div>;
  }

  const relatedWords = wordData.json_words;
  const event = wordData.event;
  const secretWords = Object.keys(relatedWords);
  const relatedWordsObject = relatedWords as unknown as Record<string, string[]>;

  return (
    <div className="container max-w-md mx-auto px-4 items-center flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center mt-8 mb-2 flex items-center justify-center">
            <div className="invisible"><Instructions/></div>
            20 Words Or Less 
            <Instructions/>
        </h1>
        {event !== "" && <div className="flex items-center justify-center text-sm text-slate-900 mb-4 font-bold">⭐{event?.toUpperCase()}⭐</div>}
        {params.date === new Date().toLocaleDateString('en-CA') ?
            <></>
            :
            <p className="flex items-center justify-center text-sm text-slate-900 mb-4 font-bold">
                { params.date }
            </p>
            
        }
        <h2 className="text-xl text-gray-400 text-center">Guess the secrets in 20 guesses or less.</h2>
        
        <WordGuessingGame
            initialSecretWords={secretWords}
            initialRelatedWords={relatedWordsObject}
        />
        <div className="min-w-[100%] px-9 py-2 mx-auto flex items-center justify-end">
            <a href="/legacy" className="font-bold text-sm text-emphasis hover:underline">Craving more?</a>
        </div>
        
    </div>
  );
}