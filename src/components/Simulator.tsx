import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Pause, 
  Sparkles, 
  Layers, 
  Sliders, 
  Info, 
  Copy, 
  Check, 
  ArrowRight,
  Calculator,
  Compass
} from 'lucide-react';

interface SimulatorProps {
  rows: number;
  setRows: (rows: number) => void;
  mode: 'centered' | 'left' | 'spaced';
  setMode: (mode: 'centered' | 'left' | 'spaced') => void;
  symbol: string;
  setSymbol: (symbol: string) => void;
  onSendToTerminal: (rowCount: number) => void;
}

export const Simulator: React.FC<SimulatorProps> = ({
  rows,
  setRows,
  mode,
  setMode,
  symbol,
  setSymbol,
  onSendToTerminal,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimatedRow, setCurrentAnimatedRow] = useState<number>(rows);
  const [copied, setCopied] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const animIntervalRef = useRef<number | null>(null);

  // Generate row data for rendering
  const triangleData = Array.from({ length: rows }, (_, i) => {
    const spaces = i;
    const starCount = 2 * (rows - i) - 1;
    let starString = '';

    if (mode === 'spaced') {
      starString = Array(starCount).fill(symbol).join(' ');
    } else {
      starString = symbol.repeat(starCount);
    }

    return {
      rowIndex: i,
      rowNumber: i + 1,
      spaces,
      starCount,
      starString,
    };
  });

  // Calculate stats
  const topStars = 2 * rows - 1;
  const totalStars = rows * rows; // sum of first n odd numbers = n^2

  // Animation controller
  useEffect(() => {
    if (isPlaying) {
      setCurrentAnimatedRow(1);
      animIntervalRef.current = window.setInterval(() => {
        setCurrentAnimatedRow((prev) => {
          if (prev >= rows) {
            setIsPlaying(false);
            if (animIntervalRef.current) clearInterval(animIntervalRef.current);
            return rows;
          }
          return prev + 1;
        });
      }, 180);
    } else {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
      setCurrentAnimatedRow(rows);
    }

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, [isPlaying, rows]);

  const handleCopyAscii = () => {
    const textOutput = triangleData
      .map((row) => {
        const leadingSpaces = mode === 'centered' ? ' '.repeat(row.spaces) : '';
        return leadingSpaces + row.starString;
      })
      .join('\n');

    navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SYMBOLS = [
    { label: '*', value: '*' },
    { label: '#', value: '#' },
    { label: '◆', value: '◆' },
    { label: '▲', value: '▲' },
    { label: '●', value: '●' },
    { label: 'x', value: 'x' },
  ];

  const PRESETS = [5, 7, 10, 12, 15, 20];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Simulator Header */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2">
              İnteraktif Üçgen Simülatörü
            </h2>
            <p className="text-xs text-slate-400">
              Parametreleri değiştirin ve yıldızların ekrana basılmasını anlık gözlemleyin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSendToTerminal(rows)}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium transition-colors flex items-center gap-1.5"
            title="Terminalde bu değerle çalıştır"
          >
            <span>Terminalde Dene</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-950/40 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Row Count Slider */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label htmlFor="rows-range" className="font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Basamak Sayısı (n):</span>
              <span className="font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 text-sm">
                {rows}
              </span>
            </label>
            <div className="flex items-center gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setRows(p)}
                  className={`px-1.5 py-0.5 text-[11px] font-mono rounded transition-colors ${
                    rows === p
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono">1</span>
            <input
              id="rows-range"
              type="range"
              min="1"
              max="25"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
            />
            <span className="text-xs text-slate-500 font-mono">25</span>
          </div>
        </div>

        {/* Alignment Mode */}
        <div className="md:col-span-4 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Hizalama ve Görünüm:
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setMode('centered')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                mode === 'centered'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Simetrik (Piramit)
            </button>
            <button
              onClick={() => setMode('left')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                mode === 'left'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sola Dayalı
            </button>
            <button
              onClick={() => setMode('spaced')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                mode === 'spaced'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Aralıklı (* *)
            </button>
          </div>
        </div>

        {/* Symbol and Play Button */}
        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3">
          {/* Symbol chooser */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Karakter
            </label>
            <div className="flex gap-1">
              {SYMBOLS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSymbol(s.value)}
                  className={`w-7 h-7 rounded text-xs font-mono flex items-center justify-center transition-colors ${
                    symbol === s.value
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Animation Toggle */}
          <div className="pt-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
                isPlaying
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
              title={isPlaying ? 'Durdur' : 'Satır Satır Çizdir'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Durdur</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Animasyon</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-5 py-3 bg-slate-950/70 border-b border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <span className="text-slate-400">Basamak Sayısı:</span>
          <span className="font-mono font-bold text-slate-200">{rows}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-slate-400">İlk Satır Yıldız:</span>
          <span className="font-mono font-bold text-slate-200">{topStars}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="text-slate-400">Toplam Yıldız (n²):</span>
          <span className="font-mono font-bold text-emerald-400">{totalStars}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <span className="text-slate-400">Yıldız Formülü:</span>
          <span className="font-mono font-bold text-purple-300">2*(n-i)-1</span>
        </div>
      </div>

      {/* Visual Canvas Display Area */}
      <div className="relative p-6 bg-gradient-to-b from-slate-950 to-slate-900/90 min-h-[340px] flex flex-col items-center justify-center overflow-x-auto">
        {/* Watermark Signature */}
        <div className="absolute top-3 right-4 select-none pointer-events-none flex items-center gap-1.5 opacity-30 text-xs font-mono text-amber-400">
          <span>Ters Üçgen v1.0 • Enes Öztürk</span>
        </div>

        {/* Copy Canvas Output */}
        <button
          onClick={handleCopyAscii}
          className="absolute top-3 left-4 p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
          title="Çizimi Metin Olarak Kopyala"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Kopyalandı</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Çıktıyı Kopyala</span>
            </>
          )}
        </button>

        {/* The Drawn Inverted Triangle */}
        <div className="font-mono text-sm sm:text-base leading-snug tracking-wider select-text flex flex-col items-start py-4">
          {triangleData.map((row) => {
            const isVisible = row.rowNumber <= currentAnimatedRow;
            if (!isVisible) return null;

            const isHovered = hoveredRow === row.rowIndex;

            return (
              <div
                key={row.rowIndex}
                onMouseEnter={() => setHoveredRow(row.rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`group flex items-center transition-colors rounded px-2 py-0.5 ${
                  isHovered ? 'bg-amber-500/10 border-l-2 border-amber-400' : ''
                }`}
              >
                {/* Row Number Helper (visible on hover) */}
                <span className="w-7 text-[10px] text-slate-600 font-mono text-right mr-3 select-none group-hover:text-amber-400/80">
                  #{row.rowNumber}
                </span>

                {/* Pre-spaces (if centered) */}
                {mode === 'centered' && (
                  <span className="whitespace-pre text-slate-700 select-none">
                    {' '.repeat(row.spaces)}
                  </span>
                )}

                {/* Stars */}
                <span
                  className={`whitespace-pre font-bold transition-all ${
                    isHovered
                      ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                      : 'text-amber-400 drop-shadow-[0_0_2px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  {row.starString}
                </span>

                {/* Line Inspector Tooltip */}
                {isHovered && (
                  <span className="ml-4 text-[11px] font-mono text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700 shadow animate-fade-in select-none">
                    i={row.rowIndex} | boşluk={row.spaces} | yıldız={row.starCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulator Footer Info */}
      <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>
            Kullanıcı girişi <strong className="text-slate-200">{rows}</strong> iken en üst satırda{' '}
            <strong className="text-amber-300">{topStars}</strong> adet yıldız, en alt satırda{' '}
            <strong className="text-amber-300">1</strong> adet yıldız basılır.
          </span>
        </div>
        <div className="font-mono text-slate-500 text-[11px]">
          İmza: Enes Öztürk
        </div>
      </div>
    </div>
  );
};
