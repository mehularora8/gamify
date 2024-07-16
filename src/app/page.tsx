import Image from "next/image";
import WordGuessingGame from "./components/game";

export default function Home() {
   // TODO: Pull Current Day Words from DB or something.
   const secretWords = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
   const relatedWords = {
     apple: ['fruit', 'red', 'round', 'pie', 'orchard'],
     banana: ['yellow', 'curved', 'peel', 'monkey', 'tropical'],
     cherry: ['red', 'small', 'pit', 'blossom', 'pie'],
     date: ['sweet', 'brown', 'palm', 'desert', 'dried'],
     elderberry: ['purple', 'small', 'cluster', 'medicinal', 'shrub'],
     fig: ['sweet', 'Mediterranean', 'leaf', 'newton', 'dried'],
     grape: ['wine', 'purple', 'vine', 'bunch', 'raisin'],
     honeydew: ['melon', 'green', 'sweet', 'smooth', 'round']
   };
 
   // Shuffle the secret words array
   const shuffledWords = secretWords.sort(() => 0.5 - Math.random());

 return (
   <div className="container mx-auto px-4">
     <h1 className="text-3xl font-bold text-center mt-8 mb-4">20 Words Or Less</h1>
     <h2 className="text-xl text-gray-400 text-center my-4">Guess the secrets in 20 guesses or less.</h2>
     <WordGuessingGame 
       initialSecretWords={shuffledWords} 
       initialRelatedWords={relatedWords} 
     />
   </div>
 );
}
