import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Code, Sparkles, Terminal } from 'lucide-react';

export const AuthorSignatureCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 p-6 shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20 flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-400" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-amber-400/90 font-bold font-mono">
                Özel İmza &amp; Geliştirici
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                <CheckCircle2 className="w-3 h-3" /> Doğrulanmış Çözüm
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Enes Öztürk
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Bu uygulama ve Java kaynak kodları, kullanıcıdan alınan basamak sayısı ile döngüler
              (nested loops) ve yıldız karakterleri kullanılarak kusursuz bir simetrik ters üçgen oluşturmak
              üzere <strong>Enes Öztürk</strong> imzasıyla tasarlanmış ve kodlanmıştır.
            </p>
          </div>
        </div>

        {/* Signature stamp seal */}
        <div className="flex-shrink-0 self-stretch md:self-auto flex items-center justify-center">
          <div className="px-5 py-3 rounded-xl bg-slate-950/80 border border-amber-500/40 text-center shadow-inner">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              Resmi İmza
            </div>
            <div className="font-serif italic text-lg sm:text-xl text-amber-300 font-bold tracking-wider my-0.5">
              Enes Öztürk
            </div>
            <div className="text-[10px] text-amber-500/80 font-mono">
              Java SE • Algoritma &amp; Veri Yapıları
            </div>
          </div>
        </div>
      </div>

      {/* Feature tags */}
      <div className="relative z-10 mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[11px] flex items-center gap-1.5">
          <Code className="w-3 h-3 text-amber-400" /> Java Scanner Input
        </span>
        <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[11px] flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-blue-400" /> Çift İç Döngü (Nested For)
        </span>
        <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[11px] flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-400" /> 2*(n-i)-1 Yıldız Formülü
        </span>
        <span className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[11px] flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-purple-400" /> Sıfır Hata / Temiz Kod
        </span>
      </div>
    </div>
  );
};
