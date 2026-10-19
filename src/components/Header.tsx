import React from 'react';
import { Terminal, Award, FileCode2, Sparkles, Download, Check, Copy } from 'lucide-react';
import { JAVA_CLASSIC_CODE } from '../data/javaCode';

interface HeaderProps {
  onDownloadJava: () => void;
  onCopyJava: () => void;
  copied: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadJava, onCopyJava, copied }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-amber-400 text-lg">☕</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Java Ters Üçgen Programı
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono font-medium">
                Java SE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Döngüler (Loops) ile Yıldız (*) Deseni Çizimi ve Algoritma Simülatörü
            </p>
          </div>
        </div>

        {/* Signature & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Enes Öztürk Signature Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 shadow-inner">
            <Award className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 leading-none">İmza</span>
              <span className="text-xs font-semibold text-amber-300 font-mono">Enes Öztürk</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onCopyJava}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
              title="Java Kodunu Kopyala"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={onDownloadJava}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md shadow-orange-950/30 transition-all cursor-pointer"
              title="TersUcgen.java Dosyasını İndir"
            >
              <Download className="w-3.5 h-3.5" />
              <span>TersUcgen.java İndir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
