import React from 'react';
import { Building2 } from 'lucide-react';
import { DEPARTMENTS } from '../../constants';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function OrgAboutModal({ activeDeptId, onTransferToDept }) {
  const { activeModal, setActiveModal, isDarkMode, tx } = useStuPDT();

  if (activeModal !== 'org_about') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`max-w-lg w-full rounded-3xl p-6 space-y-4 border-2 shadow-2xl ${
          isDarkMode
            ? 'bg-[#111116] border-[#0EC7F5] text-white'
            : 'bg-white border-[#071638] text-[#071638]'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700/40 pb-3">
          <div>
            <h3 className="text-lg font-black flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0EC7F5]" />
              <span>{tx('StuPDT Corporate Org Chart')}</span>
            </h3>
            <p className="text-xs opacity-70 font-medium">
              {tx('Click any AI department to manually transfer your ticket there')}
            </p>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="px-3 py-1 rounded-xl bg-[#F52820] text-white text-xs font-black cursor-pointer"
          >
            {tx('Close')}
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onTransferToDept(dept)}
              className={`w-full p-3 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                activeDeptId === dept.id
                  ? isDarkMode
                    ? 'bg-[#0EC7F5]/20 border-[#0EC7F5]'
                    : 'bg-[#FFE600] border-2 border-[#071638]'
                  : isDarkMode
                  ? 'bg-[#181820] hover:bg-[#23232F] border-[#2A2A35]'
                  : 'bg-[#F4F9FF] hover:bg-[#FFE600]/50 border-2 border-[#071638]'
              }`}
            >
              <div>
                <div className="text-sm font-black">{tx(dept.name)}</div>
                <div className="text-xs font-bold text-[#0EC7F5]">{tx(dept.division)}</div>
                <div className="text-[11px] opacity-70 italic">"{tx(dept.status)}"</div>
              </div>
              <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-black/40 text-white shrink-0">
                {tx(dept.code)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
