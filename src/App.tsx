/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, Wrench, Droplet, Zap, Star, Clock, 
  Home, Briefcase, Activity, User, X, Plus, Minus, ChevronRight, 
  CheckCircle2, CircleDashed, CreditCard, Map as MapIcon, HelpCircle, Settings,
  Paintbrush, Truck, Hammer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const professionalsData = [
  { id: 1, x: '30%', y: '40%', type: 'available_blue', icon: 'wrench', name: 'Carlos M.', profession: 'Gasista matriculado', rating: '4.8', jobs: '120', distance: '1.2 km', price: '$$', response: 'Responde en ~10 min' },
  { id: 2, x: '50%', y: '50%', type: 'premium_black', icon: 'water', name: 'Laura G.', profession: 'Plomero Premium', rating: '5.0', jobs: '340', distance: '0.8 km', price: '$$$', response: 'Responde en ~5 min' },
  { id: 3, x: '70%', y: '35%', type: 'inactive_gray', icon: 'bolt', name: 'Roberto V.', profession: 'Electricista', rating: '4.5', jobs: '85', distance: '2.5 km', price: '$', response: 'No disponible hoy' },
  { id: 4, x: '40%', y: '65%', type: 'available_blue', icon: 'water', name: 'Ana S.', profession: 'Plomero', rating: '4.9', jobs: '210', distance: '1.5 km', price: '$$', response: 'Responde en ~15 min' },
  { id: 5, x: '75%', y: '60%', type: 'available_blue', icon: 'wrench', name: 'Diego T.', profession: 'Gasista', rating: '4.7', jobs: '95', distance: '3.0 km', price: '$$', response: 'Responde en ~20 min' },
  { id: 6, x: '25%', y: '70%', type: 'inactive_gray', icon: 'water', name: 'Sofía L.', profession: 'Plomero', rating: '4.6', jobs: '150', distance: '4.2 km', price: '$', response: 'No disponible hoy' },
  { id: 7, x: '60%', y: '25%', type: 'premium_black', icon: 'bolt', name: 'Martín P.', profession: 'Electricista Premium', rating: '4.9', jobs: '420', distance: '1.0 km', price: '$$$', response: 'Responde en ~2 min' },
];

const Logo = () => (
  <div className="flex items-center justify-center py-3 bg-white shadow-sm z-40 relative">
    <div className="flex items-center gap-3">
      {/* Geometric Logo Icon */}
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="#0B3D91" strokeWidth="10" strokeLinejoin="round"/>
        <path d="M30 30 L70 70 M30 70 L70 30" stroke="#0B3D91" strokeWidth="10" strokeLinecap="round"/>
        <rect x="35" y="35" width="30" height="30" fill="#FFFFFF" stroke="#0B3D91" strokeWidth="8" transform="rotate(45 50 50)"/>
      </svg>
      <div className="flex flex-col justify-center">
        <span className="text-2xl font-black tracking-wide text-[#0B3D91] leading-none">OFICIUM</span>
        <span className="text-[8px] font-bold tracking-widest text-[#0B3D91] leading-none mt-1">HOMOLOGATION AUTHORITY</span>
      </div>
    </div>
  </div>
);

const Pin = ({ pin, isSelected, onClick, mapScale }: { pin: any, isSelected: boolean, onClick: () => void, mapScale: number }) => {
  let bgColor = '';
  let iconColor = '#FFFFFF';
  
  if (pin.type === 'available_blue') bgColor = '#0B3D91';
  else if (pin.type === 'premium_black') bgColor = '#000000';
  else if (pin.type === 'inactive_gray') bgColor = '#9CA3AF';

  const Icon = pin.icon === 'wrench' ? Wrench : pin.icon === 'water' ? Droplet : Zap;
  const inverseScale = 1 / mapScale;

  return (
    <div 
      className={`absolute flex flex-col items-center transition-all duration-300 cursor-pointer ${isSelected ? 'z-20' : 'z-10 hover:z-20'}`}
      style={{ 
        left: pin.x, 
        top: pin.y,
        transform: `translate(-50%, -100%) scale(${inverseScale * (isSelected ? 1.15 : 1)})`
      }}
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mapScale, setMapScale] = useState(1);
  
  const mapConstraintsRef = useRef(null);

  const handleZoomIn = () => setMapScale(s => Math.min(s + 0.5, 3));
  const handleZoomOut = () => setMapScale(s => Math.max(s - 0.5, 0.5));

  const renderMapTab = () => (
    <>
      {/* Draggable & Zoomable Map Area */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#e5e7eb]" ref={mapConstraintsRef}>
        <motion.div 
          drag 
          dragConstraints={mapConstraintsRef}
          dragElastic={0.2}
          animate={{ scale: mapScale }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute origin-center cursor-grab active:cursor-grabbing"
          style={{ width: '150%', height: '150%', left: '-25%', top: '-25%' }}
          onClick={() => setSelectedPin(null)}
        >
          {/* Map Background Simulation */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 pointer-events-none">
            <rect width="100%" height="100%" fill="#e5e7eb" />
            {/* Blocks */}
            <rect x="5%" y="5%" width="25%" height="25%" fill="#f3f4f6" rx="12" />
            <rect x="35%" y="5%" width="40%" height="20%" fill="#f3f4f6" rx="12" />
            <rect x="80%" y="5%" width="15%" height="35%" fill="#f3f4f6" rx="12" />
            <rect x="5%" y="35%" width="20%" height="35%" fill="#f3f4f6" rx="12" />
            <rect x="30%" y="30%" width="45%" height="30%" fill="#f3f4f6" rx="12" />
            <rect x="80%" y="45%" width="15%" height="25%" fill="#f3f4f6" rx="12" />
            <rect x="5%" y="75%" width="35%" height="20%" fill="#f3f4f6" rx="12" />
            <rect x="45%" y="65%" width="35%" height="30%" fill="#f3f4f6" rx="12" />
            <rect x="85%" y="75%" width="10%" height="20%" fill="#f3f4f6" rx="12" />
            {/* Parks */}
            <rect x="30%" y="30%" width="15%" height="15%" fill="#dcfce7" rx="12" />
            <rect x="45%" y="65%" width="20%" height="15%" fill="#dcfce7" rx="12" />
            {/* Water */}
            <path d="M 0 85 Q 40 95 70 80 T 100 90 L 100 100 L 0 100 Z" fill="#dbeafe" />
            {/* Roads */}
            <line x1="0" y1="27%" x2="100%" y2="27%" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="62%" x2="100%" y2="62%" stroke="#ffffff" strokeWidth="8" />
            <line x1="27%" y1="0" x2="27%" y2="100%" stroke="#ffffff" strokeWidth="8" />
            <line x1="77%" y1="0" x2="77%" y2="100%" stroke="#ffffff" strokeWidth="8" />
          </svg>

          {/* Pins */}
          {professionalsData.map(pin => (
            <Pin 
              key={pin.id} 
              pin={pin} 
              isSelected={selectedPin?.id === pin.id} 
              onClick={() => setSelectedPin(pin)} 
              mapScale={mapScale}
            />
          ))}
        </motion.div>
      </div>

      {/* Top Bar with Search */}
      <div className="absolute top-[60px] left-0 right-0 p-4 z-30 pointer-events-none">
        <div className="bg-white rounded-full shadow-lg flex items-center px-4 py-3.5 pointer-events-auto border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-[#0B3D91]/20">
          <Search size={20} className="text-[#000000] mr-3" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿Qué necesitás?" 
            className="flex-1 bg-transparent outline-none text-[15px] text-[#000000] placeholder-[#6B7280] truncate font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 mr-1 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
          <div className="w-px h-5 bg-gray-200 mx-2"></div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="p-1 text-[#000000] hover:bg-gray-50 rounded-full transition-colors"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-4 top-[140px] flex flex-col gap-2 z-20">
        <button onClick={handleZoomIn} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#000000] hover:bg-gray-50 active:scale-95 transition-all">
          <Plus size={20} />
        </button>
        <button onClick={handleZoomOut} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#000000] hover:bg-gray-50 active:scale-95 transition-all">
          <Minus size={20} />
        </button>
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

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 z-50 flex flex-col justify-end"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full rounded-t-3xl p-6 pb-10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Filtros</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="font-semibold block mb-3">Especialidad</label>
                  <div className="flex flex-wrap gap-2">
                    {['Plomería', 'Gas', 'Electricidad', 'Cerrajería'].map(cat => (
                      <span key={cat} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-[#0B3D91] hover:text-white cursor-pointer transition-colors">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="font-semibold block mb-3">Distancia máxima (km)</label>
                  <input type="range" min="1" max="20" defaultValue="5" className="w-full accent-[#0B3D91]" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 km</span>
                    <span>20 km</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-3">Calificación mínima</label>
                  <div className="flex gap-2">
                    {[4.0, 4.5, 4.8].map(rating => (
                      <button key={rating} className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl hover:border-[#0B3D91] hover:bg-[#0B3D91]/5">
                        <Star size={14} className="fill-current text-yellow-400" />
                        <span className="font-medium">{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full mt-8 bg-[#0B3D91] text-white py-4 rounded-2xl font-semibold text-[16px] active:scale-[0.98] transition-transform"
              >
                Aplicar filtros
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const renderServiciosTab = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorías</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Plomería', icon: <Droplet size={28} className="text-blue-500" /> },
            { name: 'Electricidad', icon: <Zap size={28} className="text-yellow-500" /> },
            { name: 'Gas', icon: <Wrench size={28} className="text-orange-500" /> },
            { name: 'Pintura', icon: <Paintbrush size={28} className="text-purple-500" /> },
            { name: 'Fletes', icon: <Truck size={28} className="text-green-500" /> },
            { name: 'Albañilería', icon: <Hammer size={28} className="text-stone-500" /> },
          ].map((cat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center">
                {cat.icon}
              </div>
              <span className="font-semibold text-gray-800">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActividadTab = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tu Actividad</h2>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">En curso</span>
                <h3 className="font-bold text-lg mt-2">Revisión eléctrica</h3>
                <p className="text-gray-500 text-sm">Hoy, 14:30 hs • Martín P.</p>
              </div>
              <CircleDashed size={24} className="text-blue-500 animate-spin-slow" />
            </div>
            <button className="w-full mt-2 py-2.5 bg-gray-50 text-[#0B3D91] font-semibold rounded-xl text-sm border border-gray-200">Ver detalles</button>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 opacity-75">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">Completado</span>
                <h3 className="font-bold text-lg mt-2">Reparación de cañería</h3>
                <p className="text-gray-500 text-sm">12 Mar 2026 • Laura G.</p>
              </div>
              <CheckCircle2 size={24} className="text-green-500" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-current text-yellow-400" />)}
              <span className="text-xs text-gray-500 ml-2">Calificaste con 5 estrellas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerfilTab = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8 bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
            <img src="https://picsum.photos/seed/user/200/200" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Iván C.</h2>
            <p className="text-gray-500">ivannahuelcristini@gmail.com</p>
            <button className="mt-2 text-sm font-semibold text-[#0B3D91]">Editar perfil</button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            { icon: <CreditCard size={20} />, label: 'Métodos de pago' },
            { icon: <MapIcon size={20} />, label: 'Mis direcciones' },
            { icon: <Settings size={20} />, label: 'Configuración' },
            { icon: <HelpCircle size={20} />, label: 'Ayuda y soporte' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-4 text-gray-700">
                <div className="p-2 bg-gray-50 rounded-xl text-[#0B3D91]">{item.icon}</div>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))}
          <div className="p-5 active:bg-gray-50 cursor-pointer">
            <span className="font-semibold text-red-500">Cerrar sesión</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-[#e5e7eb] overflow-hidden font-sans text-[#000000] flex justify-center">
      {/* Mobile Container */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-hidden flex flex-col">
        
        {/* Logo Header */}
        <Logo />

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {activeTab === 'Inicio' && renderMapTab()}
          {activeTab === 'Servicios' && renderServiciosTab()}
          {activeTab === 'Actividad' && renderActividadTab()}
          {activeTab === 'Perfil' && renderPerfilTab()}
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 z-40 flex justify-between items-center pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
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
