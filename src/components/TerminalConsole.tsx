import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalConsoleProps {
  initialRowCount?: number;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ initialRowCount = 10 }) => {
  const [inputVal, setInputVal] = useState<string>(initialRowCount.toString());
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const generateTerminalOutput = (n: number) => {
    const lines: string[] = [];
    lines.push('$ javac TersUcgen.java');
    lines.push('$ java TersUcgen');
    lines.push('');
    lines.push('=========================================');
    lines.push('   JAVA İLE TERS ÜÇGEN ÇİZİM PROGRAMI    ');
    lines.push('   İmza: Enes Öztürk                     ');
    lines.push('=========================================');
    lines.push('');
    lines.push(`Basamak Sayısı : ${n}`);
    lines.push('');

    let totalStars = 0;
    for (let i = 0; i < n; i++) {
      const spaces = ' '.repeat(i);
      const starCount = 2 * (n - i) - 1;
      totalStars += starCount;
      const stars = '*'.repeat(starCount);
      lines.push(`${spaces}${stars}`);
    }

    lines.push('');
    lines.push('-----------------------------------------');
    lines.push(`Toplam Basamak : ${n}`);
    lines.push(`Toplam Yıldız  : ${totalStars}`);
    lines.push('Program başarıyla tamamlandı.');
    lines.push('İmza           : Enes Öztürk');
    lines.push('=========================================');
    lines.push('');
    lines.push('$ _');
    return lines;
  };

  const runProgram = (targetN?: number) => {
    const n = targetN ?? parseInt(inputVal, 10);
    if (isNaN(n) || n <= 0) {
      setOutputLogs([
        '$ java TersUcgen',
        'Hata: Lütfen 1 veya daha büyük geçerli bir tam sayı giriniz!',
        '$ _',
      ]);
      return;
    }

    if (n > 40) {
      setOutputLogs([
        '$ java TersUcgen',
        'Uyarı: Konsol genişliği için maksimum önerilen basamak 40\'tır.',
        '$ _',
      ]);
      return;
    }

    setIsCompiling(true);
    setIsRunning(true);
    setOutputLogs(['$ javac TersUcgen.java... Derleniyor...']);

    setTimeout(() => {
      setIsCompiling(false);
      const resultLines = generateTerminalOutput(n);
      setOutputLogs(resultLines);
      setIsRunning(false);
    }, 400);
  };

  useEffect(() => {
    // Run once initially with default value
    runProgram(initialRowCount);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputLogs]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputLogs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setOutputLogs(['$ java TersUcgen', 'Konsol temizlendi. Basamak sayısı girip [Enter] tuşuna basın.', '$ _']);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600"></span>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <TerminalIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 font-semibold tracking-wide text-xs">
              bash - TersUcgen.java • Konsol Çıktısı
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
            title="Terminal Çıktısını Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Kopyala</span>
              </>
            )}
          </button>
          <button
            onClick={handleClear}
            className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
            title="Terminali Temizle"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="p-4 sm:p-5 bg-black/90 text-slate-200 min-h-[300px] max-h-[460px] overflow-y-auto overflow-x-auto leading-relaxed select-text"
      >
        {outputLogs.map((line, idx) => {
          const isHeader = line.includes('JAVA İLE TERS ÜÇGEN') || line.includes('İmza: Enes Öztürk');
          const isDivider = line.startsWith('====') || line.startsWith('----');
          const isCommand = line.startsWith('$');
          const isStarRow = line.includes('*');
          const isInputLine = line.startsWith('Basamak Sayısı :');

          return (
            <div
              key={idx}
              className={`whitespace-pre ${
                isHeader
                  ? 'text-amber-400 font-bold'
                  : isDivider
                  ? 'text-slate-600'
                  : isCommand
                  ? 'text-emerald-400 font-semibold'
                  : isInputLine
                  ? 'text-cyan-300 font-semibold'
                  : isStarRow
                  ? 'text-amber-300 tracking-wider font-bold'
                  : 'text-slate-300'
              }`}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Interactive Terminal Input Bar */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runProgram();
          }}
          className="flex items-center gap-2 flex-1 max-w-md"
        >
          <span className="text-emerald-400 font-bold select-none">$ java TersUcgen:</span>
          <span className="text-slate-400 select-none">Basamak:</span>
          <input
            type="number"
            min="1"
            max="30"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="10"
            className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-amber-300 font-bold text-center focus:outline-none focus:border-amber-500 font-mono"
          />
          <button
            type="submit"
            disabled={isRunning}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 fill-slate-950" />
            <span>Çalıştır</span>
          </button>
        </form>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span>Örnekler:</span>
          {[5, 10, 15].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setInputVal(preset.toString());
                runProgram(preset);
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
