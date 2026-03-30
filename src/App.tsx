/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, SlidersHorizontal, MapPin, Wrench, Droplet, Zap, Star, Clock, Home, Briefcase, Activity, User } from 'lucide-react';

const pins = [
  { id: 1, x: '20%', y: '30%', type: 'available_blue', icon: 'wrench' },
  { id: 2, x: '50%', y: '45%', type: 'premium_black', icon: 'water', selected: true },
  { id: 3, x: '75%', y: '25%', type: 'inactive_gray', icon: 'bolt' },
  { id: 4, x: '35%', y: '60%', type: 'available_blue', icon: 'water' },
  { id: 5, x: '80%', y: '65%', type: 'available_blue', icon: 'wrench' },
  { id: 6, x: '15%', y: '75%', type: 'inactive_gray', icon: 'water' },
  { id: 7, x: '60%', y: '15%', type: 'premium_black', icon: 'bolt' },
  { id: 8, x: '40%', y: '85%', type: 'available_blue', icon: 'wrench' },
  { id: 9, x: '85%', y: '40%', type: 'inactive_gray', icon: 'wrench' },
  { id: 10, x: '25%', y: '15%', type: 'available_blue', icon: 'bolt' },
];

const Pin = ({ pin }: { pin: any }) => {
  const isSelected = pin.selected;
  let bgColor = '';
  let iconColor = '#FFFFFF';
  
  if (pin.type === 'available_blue') bgColor = '#0B3D91';
  else if (pin.type === 'premium_black') bgColor = '#000000';
  else if (pin.type === 'inactive_gray') bgColor = '#9CA3AF';

  const Icon = pin.icon === 'wrench' ? Wrench : pin.icon === 'water' ? Droplet : Zap;

  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-full flex flex-col items-center transition-transform ${isSelected ? 'scale-110 z-20' : 'scale-100 z-10'}`}
      style={{ left: pin.x, top: pin.y }}
    >
      <div 
        className="flex items-center justify-center rounded-full shadow-md"
        style={{ backgroundColor: bgColor, width: isSelected ? '44px' : '36px', height: isSelected ? '44px' : '36px' }}
      >
        <Icon size={isSelected ? 22 : 18} color={iconColor} />
      </div>
      {/* Triangle pointer */}
      <div 
        className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent"
        style={{ borderTopColor: bgColor, marginTop: '-1px' }}
      ></div>
      
      {isSelected && (
        <div className="absolute top-full mt-1 bg-[#000000] text-white px-2.5 py-1 rounded-md shadow-md text-xs font-semibold whitespace-nowrap">
          Carlos M.
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer w-16">
      <div className={`mb-1 ${active ? 'text-[#0B3D91]' : 'text-[#9CA3AF]'}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-medium ${active ? 'text-[#0B3D91]' : 'text-[#9CA3AF]'}`}>
        {label}
      </span>
    </div>
  );
};

export default function App() {
  return (
    <div className="relative w-full h-screen bg-[#e5e7eb] overflow-hidden font-sans text-[#000000] flex justify-center">
      {/* Mobile Container (for desktop viewing) */}
      <div className="relative w-full max-w-md h-full bg-[#e5e7eb] shadow-2xl overflow-hidden">
        
        {/* Map Background Simulation */}
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Base background */}
            <rect width="100%" height="100%" fill="#e5e7eb" />
            
            {/* Blocks */}
            <rect x="-5%" y="-5%" width="30%" height="30%" fill="#f3f4f6" rx="12" />
            <rect x="30%" y="-5%" width="45%" height="25%" fill="#f3f4f6" rx="12" />
            <rect x="80%" y="-5%" width="25%" height="40%" fill="#f3f4f6" rx="12" />
            
            <rect x="-5%" y="30%" width="25%" height="40%" fill="#f3f4f6" rx="12" />
            <rect x="25%" y="25%" width="50%" height="35%" fill="#f3f4f6" rx="12" />
            <rect x="80%" y="40%" width="25%" height="30%" fill="#f3f4f6" rx="12" />
            
            <rect x="-5%" y="75%" width="40%" height="30%" fill="#f3f4f6" rx="12" />
            <rect x="40%" y="65%" width="45%" height="40%" fill="#f3f4f6" rx="12" />
            <rect x="90%" y="75%" width="15%" height="30%" fill="#f3f4f6" rx="12" />
            
            {/* Parks */}
            <rect x="25%" y="25%" width="20%" height="20%" fill="#dcfce7" rx="12" />
            <rect x="40%" y="65%" width="25%" height="20%" fill="#dcfce7" rx="12" />
            
            {/* Water */}
            <path d="M -10 90 Q 30 100 60 85 T 110 95 L 110 110 L -10 110 Z" fill="#dbeafe" />
            
            {/* Roads */}
            <line x1="-10%" y1="22%" x2="110%" y2="22%" stroke="#ffffff" strokeWidth="12" />
            <line x1="-10%" y1="62%" x2="110%" y2="62%" stroke="#ffffff" strokeWidth="12" />
            
            <line x1="22%" y1="-10%" x2="22%" y2="110%" stroke="#ffffff" strokeWidth="12" />
            <line x1="77%" y1="-10%" x2="77%" y2="110%" stroke="#ffffff" strokeWidth="12" />
          </svg>
        </div>

        {/* Pins */}
        {pins.map(pin => (
          <Pin key={pin.id} pin={pin} />
        ))}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 z-30 pointer-events-none">
          <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-3.5 pointer-events-auto border border-gray-100">
            <Search size={20} className="text-[#000000] mr-3" />
            <input 
              type="text" 
              placeholder="¿Qué necesitás? (plomero, gasista...)" 
              className="flex-1 bg-transparent outline-none text-[15px] text-[#000000] placeholder-[#6B7280] truncate font-medium"
            />
            <div className="w-px h-5 bg-gray-200 mx-3"></div>
            <SlidersHorizontal size={20} className="text-[#000000]" />
          </div>
        </div>

        {/* Bottom Sheet */}
        <div className="absolute bottom-[80px] left-0 right-0 p-4 z-30 pointer-events-none">
          <div className="bg-white rounded-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-5 pointer-events-auto border border-gray-100">
            {/* Handle bar */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>
            
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden mr-4 border border-gray-100">
                  <img src="https://picsum.photos/seed/carlos/150/150" alt="Carlos M." className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#000000] leading-tight">Carlos M.</h2>
                  <p className="text-[15px] text-[#6B7280] mt-0.5">Gasista matriculado</p>
                </div>
              </div>
              <div className="bg-gray-50 px-2.5 py-1.5 rounded-lg flex items-center border border-gray-100">
                <Star size={14} className="text-[#000000] mr-1.5 fill-current" />
                <span className="text-sm font-bold text-[#000000]">4.8</span>
              </div>
            </div>
            
            <div className="flex items-center text-[15px] text-[#6B7280] mb-5 space-x-5">
              <div className="flex items-center">
                <Briefcase size={16} className="mr-2 text-[#000000]" />
                <span>120 trabajos</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-[#000000]" />
                <span>1.2 km</span>
              </div>
              <div className="flex items-center font-semibold text-[#000000] bg-gray-50 px-2 py-0.5 rounded">
                <span>$$</span>
              </div>
            </div>
            
            <div className="flex items-center text-[14px] text-[#0B3D91] bg-[#0B3D91]/5 p-3.5 rounded-xl mb-6 border border-[#0B3D91]/10">
              <Clock size={18} className="mr-2.5" />
              <span className="font-semibold">Responde en ~10 min</span>
            </div>
            
            <button className="w-full bg-[#0B3D91] text-white py-4 rounded-2xl font-semibold text-[16px] flex justify-center items-center transition-transform active:scale-[0.98]">
              Ver perfil
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 z-40 flex justify-between items-center pb-6">
          <NavItem icon={<Home size={24} strokeWidth={2.5} />} label="Inicio" active={true} />
          <NavItem icon={<Wrench size={24} strokeWidth={2} />} label="Servicios" active={false} />
          <NavItem icon={<Activity size={24} strokeWidth={2} />} label="Actividad" active={false} />
          <NavItem icon={<User size={24} strokeWidth={2} />} label="Perfil" active={false} />
        </div>
      </div>
    </div>
  );
}
