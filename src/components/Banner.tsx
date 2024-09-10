'use client';

import { debounce } from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import userLogIn from '@/libs/userLogin';
import userLogOut from '@/libs/userLogout';
import { Nunito } from '@next/font/google';
import incrementClick from '@/libs/incrementClick';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['900'],
});
export default function Banner() {
    const [clicked, addClick] = useState(0);
    const [onMouseDowned, MouseDown] = useState(false);
    const [onTouched, Touched] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [leaderboard, setLeaderboard] = useState<User[]>([]);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);


    useEffect(() => {
        const storedClicks = localStorage.getItem('clicked_Roselia');
        if (storedClicks) {
          addClick(parseInt(storedClicks, 10));
        }
        setIsInitialized(true);
      }, []);

    // const fetchLeaderboard = async () => {
    //   try {
    //       const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users`);
    //       const data = await response.json();
    //       // Sort users by click count in descending order
    //       const sortedUsers = (data.data as User[]).sort((a, b) => b.clicked - a.clicked);
    //       setLeaderboard(sortedUsers);
    //   } catch (err) {
    //       console.error('Failed to fetch leaderboard:', err);
    //   }
    // };

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         fetchLeaderboard();
    //     }
    // }, [isLoggedIn]);

    // const toggleLeaderboard = () => {
    //   setShowLeaderboard(!showLeaderboard);
    //   if (!showLeaderboard) {
    //       fetchLeaderboard();
    //   }
    // };
    
    const incrementClickDebounced = useCallback(
        debounce((token) => {
            incrementClick(token);
        }, 1000),
        []
    );

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('clicked_Roselia', (clicked).toString());
        }
      }, [clicked,isInitialized]);
      
    const click = async () => {
        if (showLeaderboard) return;
        if (isInitialized) {
        const audio = new Audio('./sound/PopSound.mp3');
        audio.play();
        
        addClick(clicked + 1);
        setIsAnimating(true);

        // try {
        //     if (isLoggedIn) {
        //         await incrementClick(token);
        //     }
        // } catch (err) {
        //     console.error('Error incrementing click:', err);
        // }

        setTimeout(() => {
            setIsAnimating(false);
        }, 15);
        }
    };

    useEffect(() => {
        return () => {
            incrementClickDebounced.cancel();
        };
    }, [incrementClickDebounced]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice) return;

        const target = e.target as HTMLElement;
        if (target.closest('.leaderboard-toggle')) {
          e.stopPropagation();
          return;
        }
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON') {
            return;
        }
        MouseDown(true);
        click();
    };

    const handleMouseUp = () => {
        MouseDown(false);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsTouchDevice(true);
        Touched(true);
        click();
    };
    
    const handleTouchEnd = () => {
      Touched(false);
    };

    // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setError('');

    //     try {
    //         const data = await userLogIn(username);
    //         setToken(data.token);
    //         setIsLoggedIn(true);
    //         addClick(data.clicked);
    //     } catch (err) {
    //         setError('An error occurred. Please try again.');
    //     }
    // };

    // const handleLogout = async () => {
    //     try {
    //         await userLogOut();
    //         setIsLoggedIn(false);
    //         setUsername('');
    //         setToken('');
    //         addClick(0);
    //     } catch (err) {
    //         setError('An error occurred during logout. Please try again.');
    //     }
    // };

    return (
        <div 
            className={`relative w-full h-screen ${nunito.className}`}
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ userSelect: 'none' }}
        >
            {/* <div className={`h-16 flex flex-row fixed top-0 left-0 right-0 z-30`}>
              <div className="m-5 leaderboard-toggle cursor-pointer">
                  <Image 
                      src={'/img/Ranking.png'} 
                      alt="showLeaderboard"
                      width={50}
                      height={50}
                      className="hover:opacity-75 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLeaderboard();
                      }}
        
                  />
              </div>
                <div className="absolute right-3 top-3 flex flex-column h-full">
                    {!isLoggedIn ? (
                        <form onSubmit={handleLogin} className="flex flex-row items-center">
                            <input 
                                type="text" 
                                placeholder="Enter username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="p-2 m-2 border border-gray-300 rounded shadow-lg"
                                required
                            />
                            <button 
                                type="submit" 
                                className="p-2 m-2 bg-pink-400 text-white rounded shadow-lg hover:bg-pink-500"
                            >
                                Login
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    ) : (
                        <div className="flex flex-row items-center">
                            <p className="m-2 p-2 text-green-400">Logged in as: {username}</p>
                            <button 
                                onClick={handleLogout} 
                                className="m-2 p-2 bg-red-500 text-white rounded shadow-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div> */}
            <div>
                {/* Background Image */}
                <Image 
                    src="./img/RoseliaRoom.png" 
                    alt="cover" 
                    fill={true} 
                    sizes="100vw" 
                    className="object-cover w-full h-full opacity-80 blur-[6px]"
                    onDragStart={(e) => e.preventDefault()}
                />

                <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-black text-4xl font-bold">
                    <h1 className={`text-center ${nunito.className} font-black text-6xl text-red-600`}>POP ROSELIA</h1>
                    <motion.h1 
                        className={`text-center ${nunito.className} text-6xl font-black text-red-600`}
                        initial={{ scale: 1, rotate: 0 }}
                        animate={isAnimating ? { scale: 1.25, rotate: 15 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}>
                        {clicked}
                    </motion.h1>
                </div>

                {/* Popcat Image */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <Image 
                        src={(onMouseDowned || onTouched) && !showLeaderboard ? "./img/RoseliaPOP_2.png" : "./img/RoseliaPOP_1.png"} 
                        alt="POP_Roselia" 
                        width={700}
                        height={700}
                        className="object-contain"
                        onDragStart={(e) => e.preventDefault()}
                    />
                </div>
            </div>
            {/* Leaderboard Popup */}
            {/* {showLeaderboard && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-80 bg-pink-200 p-8 rounded shadow-lg z-50 w-[40vw] h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-pink-100 border-4 border-pink-300">
                  <div className="bg-pink-200 p-4 rounded bg-opacity-0">
                    <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
                    <ul>
                        {leaderboard.map((user: User, index) => (
                            <li key={user._id} className="flex justify-between py-2">
                                <span>{index + 1}. {user.username}</span>
                                <span>{user.clicked} clicks</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center items-center">
                        <button onClick={toggleLeaderboard} className="mt-2 bg-red-500 text-white rounded px-4 py-2">
                            Close
                        </button>
                    </div>
                        
                    </div>
                </div>
            )} */}
        </div>
    );
}

