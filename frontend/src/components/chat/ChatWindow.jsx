import React from 'react';
import { Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useStuPDT } from '../../contexts/StuPDTContext';

export function ChatWindow({
  activeDepartmentObj,
  messages,
  isTransferring,
  transferTarget,
  suggestedQuickReply,
  inputValue,
  setInputValue,
  onSendMessage,
  chatEndRef
}) {
  const { isDarkMode, tx } = useStuPDT();

  return (
    <section
      className={`rounded-3xl flex flex-col overflow-hidden h-[450px] sm:h-[490px] ${
        isDarkMode
          ? 'bg-[#111116] border border-[#2A2A35] shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
          : 'bg-white border-4 border-[#071638] shadow-[8px_8px_0px_#071638]'
      }`}
    >
      {/* Chat Header Bar */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b ${
          isDarkMode
            ? 'bg-[#181820] border-[#2A2A35]'
            : 'bg-[#071638] text-white border-[#071638]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse shrink-0 ${
              isDarkMode ? 'bg-[#1FE03F]' : 'bg-[#FFE600]'
            }`}
          />
          <span className="text-xs sm:text-sm font-black tracking-wide truncate">
            {tx(`LIVE AGENT: ${activeDepartmentObj.name}`)}
          </span>
          <span
            className={`hidden sm:inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
              isDarkMode
                ? 'bg-[#0EC7F5]/15 text-[#0EC7F5] border border-[#0EC7F5]/30'
                : 'bg-[#3888F2] text-white'
            }`}
          >
            {tx(activeDepartmentObj.division)}
          </span>
        </div>
        <span
          className={`text-[11px] font-black shrink-0 ${
            isDarkMode ? 'text-[#FF6B1A]' : 'text-[#FFE600]'
          }`}
        >
          {tx('Accuracy: CLASSIFIED')}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 ${
          isDarkMode ? 'bg-[#0C0C10]' : 'bg-[#F4F9FF]'
        }`}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Hold Music Transfer Banner */}
        {isTransferring && transferTarget && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between gap-3 animate-pulse ${
              isDarkMode
                ? 'bg-[#181820] border border-[#0EC7F5] text-white'
                : 'bg-[#FFE600] border-2 border-[#071638] text-[#071638]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Loader2
                className={`w-5 h-5 animate-spin shrink-0 ${
                  isDarkMode ? 'text-[#0EC7F5]' : 'text-[#071638]'
                }`}
              />
              <div>
                <p className="text-xs sm:text-sm font-black">
                  {tx(`Transferring you to ${transferTarget.name}...`)}
                </p>
                <p className="text-xs opacity-80 font-medium">
                  {tx('"Your concern has been forwarded to someone who will forward it to someone else."')}
                </p>
              </div>
            </div>
            <span
              className={`text-xs font-black px-2.5 py-1 rounded-lg shrink-0 ${
                isDarkMode ? 'bg-[#0EC7F5] text-[#08080A]' : 'bg-[#071638] text-[#FFE600]'
              }`}
            >
              {tx('99%')}
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Glowing Suggested Next Reply Bar (Zero Typing Needed!) */}
      {suggestedQuickReply && !isTransferring && (
        <div
          className={`px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-2 ${
            isDarkMode
              ? 'bg-[#181820] border-[#1FE03F]/40'
              : 'bg-[#FFE600] border-[#071638]'
          }`}
        >
          <span
            className={`text-xs font-black uppercase tracking-wide flex items-center gap-1.5 ${
              isDarkMode ? 'text-[#1FE03F]' : 'text-[#071638]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {tx('Suggested Next Click:')}
          </span>
          <button
            onClick={() => {
              if (suggestedQuickReply.action) {
                suggestedQuickReply.action();
              } else {
                onSendMessage(suggestedQuickReply.value);
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition cursor-pointer ${
              isDarkMode
                ? 'bg-[#1FE03F] hover:bg-[#19c435] text-[#08080A] shadow-[0_0_16px_rgba(31,224,63,0.35)]'
                : 'bg-[#071638] hover:bg-[#0f2963] text-[#FFE600]'
            }`}
          >
            <span>{tx(suggestedQuickReply.label)}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}

      {/* Chat Input Bar with Integrated Vision AI Camera Button */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={onSendMessage}
        isTransferring={isTransferring}
      />
    </section>
  );
}
