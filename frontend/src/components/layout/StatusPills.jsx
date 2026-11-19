import React from 'react';
import { ChevronRight, Flame } from 'lucide-react';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function StatusPills({ activeDepartmentObj }) {
  const {
    isDarkMode,
    tx,
    chaosMeter,
    specialistsConsulted,
    minutesWasted,
    setActiveModal
  } = useStuPDT();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Pill 1: Active Department */}
      <button
        onClick={() => setActiveModal('org_about')}
        className={`rounded-2xl p-3 flex items-center justify-between text-left transition cursor-pointer ${
          isDarkMode
            ? 'bg-[#111116] hover:bg-[#181820] border border-[#2A2A35]'
            : 'bg-white hover:bg-[#F4F9FF] border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
        }`}
      >
        <div className="min-w-0 pr-2">
          <span
            className={`text-[10px] font-black uppercase tracking-wider block ${
              isDarkMode ? 'text-[#0EC7F5]' : 'text-[#3888F2]'
            }`}
          >
            {tx('Active Dept')}
          </span>
          <p className="text-xs sm:text-sm font-black truncate mt-0.5">
            {tx(activeDepartmentObj.name)}
          </p>
        </div>
        <ChevronRight className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-[#071638]'}`} />
      </button>

      {/* Pill 2: Chaos Meter */}
      <div
        className={`rounded-2xl p-3 flex flex-col justify-center ${
          isDarkMode
            ? 'bg-[#111116] border border-[#2A2A35]'
            : 'bg-[#071638] text-white border-2 border-[#071638] shadow-[4px_4px_0px_#FFE600]'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-black mb-1.5">
          <span
            className={`flex items-center gap-1 uppercase tracking-wider text-[10px] ${
              isDarkMode ? 'text-[#FF6B1A]' : 'text-[#FFE600]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            {tx('Chaos Meter')}
          </span>
          <span className={chaosMeter >= 80 ? 'text-[#F52820]' : isDarkMode ? 'text-[#1FE03F]' : 'text-[#FFE600]'}>
            {tx(`${chaosMeter}%`)}
          </span>
        </div>
        <div
          className={`w-full h-2.5 rounded-full overflow-hidden ${
            isDarkMode ? 'bg-[#23232F]' : 'bg-white/20'
          }`}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${chaosMeter}%`,
              background:
                chaosMeter >= 80
                  ? '#F52820'
                  : isDarkMode
                  ? 'linear-gradient(90deg, #1FE03F, #FF6B1A)'
                  : '#FFE600'
            }}
          />
        </div>
      </div>

      {/* Pill 3: Problems Solved (Permanently 0%) */}
      <button
        onClick={() => setActiveModal('report')}
        className={`rounded-2xl p-3 flex items-center justify-between text-left transition cursor-pointer ${
          isDarkMode
            ? 'bg-[#111116] hover:bg-[#181820] border border-[#2A2A35]'
            : 'bg-white hover:bg-[#F4F9FF] border-2 border-[#071638] shadow-[4px_4px_0px_#071638]'
        }`}
      >
        <div>
          <span
            className={`text-[10px] font-black uppercase tracking-wider block ${
              isDarkMode ? 'text-[#1FE03F]' : 'text-[#3888F2]'
            }`}
          >
            {tx('Problems Solved')}
          </span>
          <p className="text-xs sm:text-sm font-black mt-0.5">
            {tx(`${specialistsConsulted} Depts • ${minutesWasted}m Wasted`)}
          </p>
        </div>
        <span
          className={`text-sm font-black px-2.5 py-1 rounded-xl ${
            isDarkMode
              ? 'bg-[#F52820]/20 text-[#F52820] border border-[#F52820]/40'
              : 'bg-[#FFE600] text-[#071638] border-2 border-[#071638]'
          }`}
        >
          {tx('0%')}
        </span>
      </button>
    </div>
  );
}
