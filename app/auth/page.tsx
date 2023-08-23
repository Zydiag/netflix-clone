'use client';
import Input from '@/components/Input';
import axios from 'axios';

import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
      // console.log(error?.response?.data);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url(/images/hero.jpg)] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16  self-center mt-2 lg:w-2/5 lg:max-w-md w-full rounded-md">
            <h2 className="text-4xl text-white mb-8 font-semibold">
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="UserName"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 text-white rounded-md w-full mt-10 hover:bg-red-700 transition py-3"
            >
              {variant === 'login' ? 'Login' : 'Register'}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="
                w-10 h-10
                bg-white
                rounded-full
                flex items-center justify-center
                cursor-pointer
                hover:opacity-80
                transition
              "
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="
                w-10 h-10
                bg-white
                rounded-full
                flex items-center justify-center
                cursor-pointer
                hover:opacity-80
                transition
              "
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 text-sm">
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;