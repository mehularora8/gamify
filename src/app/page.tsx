import { redirect } from 'next/navigation';

export default function Home() {
  const currentDate = new Date().toLocaleDateString('en-CA');
  redirect(`/game/${currentDate}`);
}