'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smartphone, Signal, Battery, ArrowLeft } from 'lucide-react';

const ussdMenu = {
  '': {
    text: 'Welcome to AbiliMove\n1. Submit Courtesy Rating\n2. Find Nearest Ride',
    options: {
      '1': 'rating_start',
      '2': 'find_ride_start',
    },
  },
  'rating_start': {
    text: 'Courtesy Rating:\n1. Driver Friendly\n2. Driver Rude\n3. Vehicle Accessible',
    options: {
      '1': 'rating_end',
      '2': 'rating_end',
      '3': 'rating_end',
    },
  },
  'rating_end': {
    text: 'Thank you for your feedback.',
    end: true,
  },
  'find_ride_start': {
    text: 'Finding nearest ride... You will receive an SMS with contact details shortly.',
    end: true,
  },
};

export default function UssdPage() {
  const [currentScreen, setCurrentScreen] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
        setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const handleSend = () => {
    const currentMenu = ussdMenu[currentScreen as keyof typeof ussdMenu];
    if (currentMenu && currentMenu.options) {
      const nextScreen = currentMenu.options[inputValue as keyof typeof currentMenu.options];
      if (nextScreen) {
        setHistory([...history, currentScreen]);
        setCurrentScreen(nextScreen);
      }
    }
    setInputValue('');
  };
  
  const handleBack = () => {
    if (history.length > 0) {
        const prevScreen = history[history.length - 1];
        setHistory(history.slice(0, -1));
        setCurrentScreen(prevScreen);
    }
  }

  const handleCancel = () => {
    setCurrentScreen('');
    setInputValue('');
    setHistory([]);
  };
  
  const menuData = ussdMenu[currentScreen as keyof typeof ussdMenu];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Header
        title="USSD Service Simulator"
        description="Access core features with a simple text-based interface."
      />

      <div className="flex justify-center">
        <div className="w-full max-w-sm bg-black rounded-[40px] p-2 shadow-2xl border-4 border-gray-800">
            <div className="bg-black w-full h-full rounded-[32px] overflow-hidden relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-lg z-10"></div>
                <Card className="bg-gray-800 text-green-400 rounded-none border-none h-[550px] flex flex-col font-mono">
                    <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-300">
                        <span>{time || '...'}</span>
                        <div className="flex items-center gap-1">
                            <Signal size={16} />
                            <span>Safaricom</span>
                            <Battery size={16} />
                        </div>
                    </div>
                    <CardContent className="flex-1 flex flex-col justify-center p-4">
                        <div className="whitespace-pre-line text-lg">
                            {menuData?.text || 'Invalid option.'}
                        </div>
                    </CardContent>
                    {!menuData?.end && (
                        <div className="p-4 border-t border-gray-700 space-y-2">
                            <Input 
                                type="text"
                                className="bg-gray-700 border-gray-600 text-green-400 focus:ring-green-500"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <div className="flex justify-between">
                                <Button variant="ghost" className="text-gray-300 hover:bg-gray-700" onClick={handleCancel}>Cancel</Button>
                                {history.length > 0 && <Button variant="ghost" className="text-gray-300 hover:bg-gray-700" onClick={handleBack}><ArrowLeft className="mr-2"/>Back</Button>}
                                <Button variant="ghost" className="text-green-400 hover:bg-gray-700" onClick={handleSend}>Send</Button>
                            </div>
                        </div>
                    )}
                     {menuData?.end && (
                        <div className="p-4 border-t border-gray-700">
                             <Button variant="ghost" className="text-gray-300 hover:bg-gray-700 w-full" onClick={handleCancel}>OK</Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
      </div>
    </main>
  );
}
