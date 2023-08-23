'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useCurrentUser } from './hooks/useCurrentUser';

export default function Home() {

  const {data: user} = useCurrentUser();
  console.log(user);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });
  if (session) {
    return (
      <>
        <h1 className="text-4xl text-rose-300">Hello world</h1>
        <p className='text-2xl text-emerald-300'>{user?.name}</p>
        <button
          className="bg-red-500 rounded px-5 py-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    )
    }else{
      return (
        redirect('/api/auth/signin')
      )
    }
}
