import React from 'react';
import { BookOpen, Calculator, Cpu, HelpCircle, Sparkles, Binary } from 'lucide-react';

interface AlgorithmExplainerProps {
  rows: number;
}

export const AlgorithmExplainer: React.FC<AlgorithmExplainerProps> = ({ rows }) => {
  // Generate sample rows for table (up to 8 rows for clean display)
  const displayRows = Math.min(rows, 8);
  const sampleData = Array.from({ length: displayRows }, (_, i) => {
    const spaces = i;
    const remaining = rows - i;
    const stars = 2 * (rows - i) - 1;
    return {
      i,
      spaces,
      remaining,
      stars,
      preview: ' '.repeat(spaces) + '*'.repeat(Math.min(stars, 21)) + (stars > 21 ? '...' : ''),
    };
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-slate-100">
              Algoritma ve Matematiksel Mantık Analizi
            </h2>
            <p className="text-xs text-slate-400">
              İç içe döngülerin (nested loops) çalışma prensibi ve matematiksel formülleri
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
          Formül: 2(n - i) - 1
        </div>
      </div>

      {/* 3 Core Loops Breakdown */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800/80 bg-slate-950/30">
        {/* Step 1: Outer Loop */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center font-mono">
                1
              </span>
              <h3 className="text-xs font-bold text-slate-200">Dış Döngü (Satırlar)</h3>
            </div>
            <code className="block bg-slate-950 p-2 rounded text-[11px] font-mono text-blue-300 border border-slate-800 mb-2">
              for (int i = 0; i &lt; n; i++)
            </code>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kullanıcının girdiği <strong className="text-slate-200">n={rows}</strong> basamak sayısı kadar satır oluşturur. Her adımda bir alt satıra geçer.
            </p>
          </div>
          <div className="mt-3 text-[11px] text-blue-400/90 font-mono">
            Toplam Tekrar: {rows} kez
          </div>
        </div>

        {/* Step 2: Space Loop */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center font-mono">
                2
              </span>
              <h3 className="text-xs font-bold text-slate-200">1. İç Döngü (Boşluklar)</h3>
            </div>
            <code className="block bg-slate-950 p-2 rounded text-[11px] font-mono text-amber-300 border border-slate-800 mb-2">
              for (int j = 0; j &lt; i; j++)
            </code>
            <p className="text-xs text-slate-400 leading-relaxed">
              Üçgenin simetrik görünmesi için satırın başına <code className="text-amber-400 font-mono">i</code> adet boşluk ekler. (0. satırda 0, 1. satırda 1, ...)
            </p>
          </div>
          <div className="mt-3 text-[11px] text-amber-400/90 font-mono">
            Boşluk Sayısı: i
          </div>
        </div>

        {/* Step 3: Star Loop */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
                3
              </span>
              <h3 className="text-xs font-bold text-slate-200">2. İç Döngü (Yıldızlar)</h3>
            </div>
            <code className="block bg-slate-950 p-2 rounded text-[11px] font-mono text-emerald-300 border border-slate-800 mb-2">
              for (int k = 0; k &lt; 2*(n-i)-1; k++)
            </code>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ardışık azalan tek sayılar kuralıyla her satıra yıldız (*) basar. En üst satırda <strong className="text-emerald-300">{2*rows - 1}</strong>, en altta <strong className="text-emerald-300">1</strong> yıldız basılır.
            </p>
          </div>
          <div className="mt-3 text-[11px] text-emerald-400/90 font-mono">
            Yıldız Sayısı: 2 * (n - i) - 1
          </div>
        </div>
      </div>

      {/* Mathematical Proof & Trace Table */}
      <div className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Döngü Değişkenleri İzleme Tablosu (n = {rows})
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            {rows > 8 ? `İlk 8 basamak listeleniyor (toplam ${rows})` : `Tüm basamaklar listeleniyor`}
          </span>
        </div>

        {/* Trace Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[11px]">
              <tr>
                <th className="px-4 py-2.5">Satır (i)</th>
                <th className="px-4 py-2.5">Boşluk Döngüsü (j &lt; i)</th>
                <th className="px-4 py-2.5">Kalan (n - i)</th>
                <th className="px-4 py-2.5 text-amber-300 font-bold">Yıldız Sayısı [2*(n-i)-1]</th>
                <th className="px-4 py-2.5">Satır Önizlemesi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {sampleData.map((row) => (
                <tr key={row.i} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-2 font-bold text-blue-400">i = {row.i} (Satır {row.i + 1})</td>
                  <td className="px-4 py-2 text-slate-400">{row.spaces} boşluk</td>
                  <td className="px-4 py-2 text-slate-400">{row.remaining}</td>
                  <td className="px-4 py-2 font-bold text-amber-400">{row.stars} yıldız</td>
                  <td className="px-4 py-2 whitespace-pre text-amber-300 text-[11px]">
                    {row.preview}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Theoretical Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tek Sayılar Toplamı Özelliği:</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              İlk <code className="text-slate-200 font-mono">n</code> adet tek sayının toplamı{' '}
              <strong className="text-amber-300 font-mono">1 + 3 + 5 + ... + (2n-1) = n²</strong> formülüne eşittir.{' '}
              Örneğin basamak sayısı 10 ise toplam yıldız sayısı <strong className="text-amber-300 font-mono">10² = 100</strong> adettir.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Karmaşıklık Analizi (Complexity):</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              <strong className="text-slate-200">Zaman Karmaşıklığı:</strong> <code className="text-blue-300 font-mono">O(n²)</code>{' '}
              (İç içe iki döngü toplam n² işlem yapar).<br />
              <strong className="text-slate-200">Alan (Uzay) Karmaşıklığı:</strong> <code className="text-emerald-300 font-mono">O(1)</code>{' '}
              (Ekstra dizi ya da veri yapısı tutulmaz, doğrudan konsola yazdırılır).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
