// This file is your "/" route (home).
// We immediately redirect to /login so login is the first screen.
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // change later to '/admin' or landing page in 1 line
}
