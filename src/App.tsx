/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Wrench, Droplet, Zap, Star, Clock, Home, Briefcase, Activity, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const professionalsData = [
  { id: 1, x: '20%', y: '30%', type: 'available_blue', icon: 'wrench', name: 'Carlos M.', profession: 'Gasista matriculado', rating: '4.8', jobs: '120', distance: '1.2 km', price: '$$', response: 'Responde en ~10 min' },
  { id: 2, x: '50%', y: '45%', type: 'premium_black', icon: 'water', name: 'Laura G.', profession: 'Plomero Premium', rating: '5.0', jobs: '340', distance: '0.8 km', price: '$$$', response: 'Responde en ~5 min' },
  { id: 3, x: '75%', y: '25%', type: 'inactive_gray', icon: 'bolt', name: 'Roberto V.', profession: 'Electricista', rating: '4.5', jobs: '85', distance: '2.5 km', price: '$', response: 'No disponible hoy' },
  { id: 4, x: '35%', y: '60%', type: 'available_blue', icon: 'water', name: 'Ana S.', profession: 'Plomero', rating: '4.9', jobs: '210', distance: '1.5 km', price: '$$', response: 'Responde en ~15 min' },
  { id: 5, x: '80%', y: '65%', type: 'available_blue', icon: 'wrench', name: 'Diego T.', profession: 'Gasista', rating: '4.7', jobs: '95', distance: '3.0 km', price: '$$', response: 'Responde en ~20 min' },
  { id: 6, x: '15%', y: '75%', type: 'inactive_gray', icon: 'water', name: 'Sofía L.', profession: 'Plomero', rating: '4.6', jobs: '150', distance: '4.2 km', price: '$', response: 'No disponible hoy' },
  { id: 7, x: '60%', y: '15%', type: 'premium_black', icon: 'bolt', name: 'Martín P.', profession: 'Electricista Premium', rating: '4.9', jobs: '420', distance: '1.0 km', price: '$$$', response: 'Responde en ~2 min' },
];

const Pin = ({ pin, isSelected, onClick }: { pin: any, isSelected: boolean, onClick: () => void }) => {
  let bgColor = '';
  let iconColor = '#FFFFFF';
  
  if (pin.type === 'available_blue') bgColor = '#0B3D91';
  else if (pin.type === 'premium_black') bgColor = '#000000';
  else if (pin.type === 'inactive_gray') bgColor = '#9CA3AF';

  const Icon = pin.icon === 'wrench' ? Wrench : pin.icon === 'water' ? Droplet : Zap;

  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-full flex flex-col items-center transition-all duration-300 cursor-pointer ${isSelected ? 'scale-110 z-20' : 'scale-100 z-10 hover:scale-105'}`}
      style={{ left: pin.x, top: pin.y }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div 
        className="flex items-center justify-center rounded-full shadow-md transition-all duration-300"
        style={{ backgroundColor: bgColor, width: isSelected ? '48px' : '36px', height: isSelected ? '48px' : '36px' }}
      >
        <Icon size={isSelected ? 24 : 18} color={iconColor} />
      </div>
      {/* Triangle pointer */}
      <div 
        className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent transition-all duration-300"
        style={{ borderTopColor: bgColor, marginTop: '-1px' }}
      ></div>
      
      {isSelected && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-1 bg-[#000000] text-white px-2.5 py-1 rounded-md shadow-md text-xs font-semibold whitespace-nowrap"
        >
          {pin.name}
        </motion.div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center justify-center cursor-pointer w-16 transition-colors">
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
  const [selectedPin, setSelectedPin] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('Inicio');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative w-full h-screen bg-[#e5e7eb] overflow-hidden font-sans text-[#000000] flex justify-center">
      {/* Mobile Container (for desktop viewing) */}
      <div className="relative w-full max-w-md h-full bg-[#e5e7eb] shadow-2xl overflow-hidden flex flex-col">
        
        {activeTab === 'Inicio' ? (
          <>
            {/* Map Area */}
            <div className="absolute inset-0 z-0" onClick={() => setSelectedPin(null)}>
              {/* Map Background Simulation */}
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
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

              {/* Pins */}
              {professionalsData.map(pin => (
                <Pin 
                  key={pin.id} 
                  pin={pin} 
                  isSelected={selectedPin?.id === pin.id} 
                  onClick={() => setSelectedPin(pin)} 
                />
              ))}
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-12 z-30 pointer-events-none">
              <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-3.5 pointer-events-auto border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-[#0B3D91]/20">
                <Search size={20} className="text-[#000000] mr-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="¿Qué necesitás? (plomero, gasista...)" 
                  className="flex-1 bg-transparent outline-none text-[15px] text-[#000000] placeholder-[#6B7280] truncate font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 mr-1 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
                <div className="w-px h-5 bg-gray-200 mx-2"></div>
                <button className="p-1 text-[#000000] hover:bg-gray-50 rounded-full transition-colors">
                  <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Bottom Sheet Animated */}
            <AnimatePresence>
              {selectedPin && (
                <motion.div 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute bottom-[80px] left-0 right-0 p-4 z-30 pointer-events-none"
                >
                  <div className="bg-white rounded-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-5 pointer-events-auto border border-gray-100">
                    {/* Handle bar (Click to close) */}
                    <div 
                      className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-5 cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() => setSelectedPin(null)}
                    ></div>
                    
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center">
                        <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden mr-4 border border-gray-100">
                          <img src={`https://picsum.photos/seed/${selectedPin.name}/150/150`} alt={selectedPin.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-[#000000] leading-tight">{selectedPin.name}</h2>
                          <p className="text-[15px] text-[#6B7280] mt-0.5">{selectedPin.profession}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-2.5 py-1.5 rounded-lg flex items-center border border-gray-100">
                        <Star size={14} className="text-[#000000] mr-1.5 fill-current" />
                        <span className="text-sm font-bold text-[#000000]">{selectedPin.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-[15px] text-[#6B7280] mb-5 space-x-5">
                      <div className="flex items-center">
                        <Briefcase size={16} className="mr-2 text-[#000000]" />
                        <span>{selectedPin.jobs} trabajos</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-[#000000]" />
                        <span>{selectedPin.distance}</span>
                      </div>
                      <div className="flex items-center font-semibold text-[#000000] bg-gray-50 px-2 py-0.5 rounded">
                        <span>{selectedPin.price}</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center text-[14px] p-3.5 rounded-xl mb-6 border ${selectedPin.type === 'inactive_gray' ? 'bg-gray-50 text-gray-500 border-gray-200' : 'bg-[#0B3D91]/5 text-[#0B3D91] border-[#0B3D91]/10'}`}>
                      <Clock size={18} className="mr-2.5" />
                      <span className="font-semibold">{selectedPin.response}</span>
                    </div>
                    
                    <button 
                      onClick={() => alert(`Navegando al perfil de ${selectedPin.name}`)}
                      className={`w-full py-4 rounded-2xl font-semibold text-[16px] flex justify-center items-center transition-transform active:scale-[0.98] ${selectedPin.type === 'inactive_gray' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#0B3D91] text-white hover:bg-[#093070]'}`}
                    >
                      Ver perfil
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* Placeholder for other tabs */
          <div className="flex-1 flex flex-col items-center justify-center bg-white z-10 pb-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {activeTab === 'Servicios' && <Wrench size={32} className="text-gray-400" />}
              {activeTab === 'Actividad' && <Activity size={32} className="text-gray-400" />}
              {activeTab === 'Perfil' && <User size={32} className="text-gray-400" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeTab}</h2>
            <p className="text-gray-500">Esta pantalla está en construcción.</p>
            <button 
              onClick={() => setActiveTab('Inicio')}
              className="mt-8 px-6 py-2 bg-[#0B3D91]/10 text-[#0B3D91] font-semibold rounded-full"
            >
              Volver al mapa
            </button>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 z-40 flex justify-between items-center pb-6">
          <NavItem 
            icon={<Home size={24} strokeWidth={activeTab === 'Inicio' ? 2.5 : 2} />} 
            label="Inicio" 
            active={activeTab === 'Inicio'} 
            onClick={() => setActiveTab('Inicio')}
          />
          <NavItem 
            icon={<Wrench size={24} strokeWidth={activeTab === 'Servicios' ? 2.5 : 2} />} 
            label="Servicios" 
            active={activeTab === 'Servicios'} 
            onClick={() => setActiveTab('Servicios')}
          />
          <NavItem 
            icon={<Activity size={24} strokeWidth={activeTab === 'Actividad' ? 2.5 : 2} />} 
            label="Actividad" 
            active={activeTab === 'Actividad'} 
            onClick={() => setActiveTab('Actividad')}
          />
          <NavItem 
            icon={<User size={24} strokeWidth={activeTab === 'Perfil' ? 2.5 : 2} />} 
            label="Perfil" 
            active={activeTab === 'Perfil'} 
            onClick={() => setActiveTab('Perfil')}
          />
        </div>
      </div>
    </div>
  );
}
