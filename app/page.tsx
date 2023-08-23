'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Navbar from '@/components/Navbar';

export default function Home() {
  const { data: user } = useCurrentUser();
  console.log(user);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });
  return (
    <>
      <Navbar />
    </>
  );
}
