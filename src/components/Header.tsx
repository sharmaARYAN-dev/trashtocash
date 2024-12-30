'use client';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

export default function Header({session}:{session:Session | null}){
    return(
        <header className="border-b flex justify-between p-2">
            <Link 
             className="text-black-400"
             href="/">
                Trash2Cash
            </Link>
            <nav className="*border rounded px-2 flex gap-3">
            <button className="border rounded px-2 inline-flex items-center gap-2"> 
                <FontAwesomeIcon icon={faEnvelope} className="h-4"/>
                <span>
                Inbox
                </span>
                </button  >
                {!session?.user && (
                    <>
                    <button 
                 onClick={() => signIn('google')}
                className="border rounded px-2">Login</button>
                <button className="border rounded px-2">SignUp</button>
                    </>
                )}
                <button className="border rounded px-2 items-center justify-center"> 
                    <Link href={'/postItem'} >Sell</Link>
                    </button>
               
                {session?.user && (
                    <Link href={'/account'}>
                    <Image className="rounded-full" src={session.user.image as string} alt={'Profile Pic'} width={40} height={80} />
                    </Link>
                )}
            </nav>
        </header>
    );
}