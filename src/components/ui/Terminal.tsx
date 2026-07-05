import { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  text: string;
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: 'Initializing secure node connection...' },
    { type: 'output', text: 'Connection established. Welcome back, agent.' },
    { type: 'output', text: 'Type "help" to list available commands, or click options below.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory: TerminalLine[] = [...history, { type: 'input', text: cmd }];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  whoami      - display primary role and details' },
          { type: 'output', text: '  specialties - view domains of expertise' },
          { type: 'output', text: '  stats       - show developer metrics' },
          { type: 'output', text: '  contact     - show communication channels' },
          { type: 'output', text: '  clear       - wipe terminal screen' }
        );
        break;
      case 'whoami':
        newHistory.push(
          { type: 'output', text: 'Name: KRI$H' },
          { type: 'output', text: 'Role: Security Researcher & Developer' },
          { type: 'output', text: 'Status: Active / Open to opportunities' },
          { type: 'output', text: 'Bio: Building AI-powered security tooling, ESP32 firmware analysis, and Android reverse engineering frameworks.' }
        );
        break;
      case 'specialties':
        newHistory.push(
          { type: 'output', text: 'Core Areas of Operation:' },
          { type: 'output', text: '  • Cybersecurity & Bug Bounty (CVE research, exploit development)' },
          { type: 'output', text: '  • Embedded Systems (ESP32 telemetry firmware, RF analysis)' },
          { type: 'output', text: '  • Mobile Operations (Android rooting, hook setups, Frida, Xposed)' },
          { type: 'output', text: '  • AI Orchestration (Autonomous content agents, local LLM integrations)' }
        );
        break;
      case 'stats':
        newHistory.push(
          { type: 'output', text: 'Metrics Overview:' },
          { type: 'output', text: '  - Repositories: 30+' },
          { type: 'output', text: '  - CVE PoCs: 5+' },
          { type: 'output', text: '  - Custom Tools: 12+' },
          { type: 'output', text: '  - AI projects: 6+' }
        );
        break;
      case 'contact':
        newHistory.push(
          { type: 'output', text: 'Direct lines:' },
          { type: 'output', text: '  - Email: krishy2122@gmail.com' },
          { type: 'output', text: '  - Twitter/X: @ykrishhh' },
          { type: 'output', text: '  - Telegram: @Mcpaitgbot' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of commands.`,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-green-950/10">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d] border-b border-[#1a1a1a]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/60" />
        </div>
        <span className="font-mono text-xs text-gray-500">KRI$H — ~/research</span>
        <div className="w-10" />
      </div>

      {/* Terminal Screen with internal scan lines */}
      <div className="relative">
        {/* Internal scan line overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.008)_2px,rgba(0,255,0,0.008)_4px)] pointer-events-none z-10 animate-terminal-scan" />

        <div className="p-5 h-72 overflow-y-auto font-mono text-sm space-y-2 text-gray-300 terminal-scroll relative z-0">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line.type === 'input' && (
                <span className="text-green-400">
                  <span className="text-gray-500 mr-2">$</span>
                  {line.text}
                </span>
              )}
              {line.type === 'output' && <span className="text-gray-300">{line.text}</span>}
              {line.type === 'error' && <span className="text-red-400">{line.text}</span>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input row */}
      <div className="flex items-center px-5 py-3 border-t border-[#1a1a1a] bg-[#070707] font-mono text-sm">
        <span className="text-green-500 mr-2">$</span>
        <div className="flex-1 flex items-center">
          <input
            type="text"
            className="flex-1 bg-transparent text-green-400 focus:outline-none placeholder-green-950"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <span className="w-[2px] h-4 bg-green-500 animate-caret-blink" />
        </div>
      </div>

      {/* Quick click options */}
      <div className="flex flex-wrap gap-2 px-5 pb-4 bg-[#070707] font-mono text-xs">
        <span className="text-gray-600 mr-1 self-center">Suggestions:</span>
        {['whoami', 'specialties', 'stats', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-1 rounded border border-green-950 bg-green-950/10 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-glow-green-sm transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
