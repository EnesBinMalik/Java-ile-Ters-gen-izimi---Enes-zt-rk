/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Simulator } from './components/Simulator';
import { TerminalConsole } from './components/TerminalConsole';
import { CodeViewer } from './components/CodeViewer';
import { AlgorithmExplainer } from './components/AlgorithmExplainer';
import { AuthorSignatureCard } from './components/AuthorSignatureCard';
import { JAVA_CLASSIC_CODE } from './data/javaCode';
import { 
  Terminal, 
  Code2, 
  Eye, 
  BookOpen, 
  Download, 
  Copy, 
  Check, 
  CheckCircle,
  HelpCircle,
  Github,
  Award
} from 'lucide-react';

export default function App() {
  const [rows, setRows] = useState<number>(10);
  const [mode, setMode] = useState<'centered' | 'left' | 'spaced'>('centered');
  const [symbol, setSymbol] = useState<string>('*');
  const [activeTab, setActiveTab] = useState<'all' | 'simulator' | 'terminal' | 'code' | 'algorithm'>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyJava = () => {
    navigator.clipboard.writeText(JAVA_CLASSIC_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJavaFile = (filename = 'TersUcgen.java', content = JAVA_CLASSIC_CODE) => {
    const blob = new Blob([content], { type: 'text/x-java-source;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendToTerminal = (targetRows: number) => {
    setRows(targetRows);
    setActiveTab('terminal');
    // Scroll smoothly to terminal section if in 'all' view
    const elem = document.getElementById('terminal-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header */}
      <Header
        onDownloadJava={() => handleDownloadJavaFile()}
        onCopyJava={handleCopyJava}
        copied={copied}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Hero Section & Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Enes Öztürk Özel Algoritma Çözümü</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Java ile Ters Üçgen Çizimi
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Kullanıcıdan alınan basamak sayısı ile döngüler (nested loops) kullanılarak ekrana yıldızlar (*) ile ters üçgen çizen tam fonksiyonel Java programı ve simülatörü.
            </p>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tümünü Göster
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Simülatör
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Konsol (Terminal)
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Java Kodu
            </button>
            <button
              onClick={() => setActiveTab('algorithm')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'algorithm'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Algoritma Mantığı
            </button>
          </div>
        </div>

        {/* Author Signature Card */}
        <AuthorSignatureCard />

        {/* Content Area Based on Active Tab */}
        {(activeTab === 'all' || activeTab === 'simulator') && (
          <section id="simulator-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <h3 className="text-base font-bold text-white tracking-wide">
                  İnteraktif Görsel Simülatör
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Örnek Değer: 10 Basamak
              </span>
            </div>
            <Simulator
              rows={rows}
              setRows={setRows}
              mode={mode}
              setMode={setMode}
              symbol={symbol}
              setSymbol={setSymbol}
              onSendToTerminal={handleSendToTerminal}
            />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'terminal') && (
          <section id="terminal-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Java Terminal &amp; Konsol Çıktısı (Simülasyon)
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Gerçek Java Scanner Girişi ve Döngü Çıktısı
              </span>
            </div>
            <TerminalConsole initialRowCount={rows} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'code') && (
          <section id="code-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Eksiksiz Java Kaynak Kodları (Enes Öztürk İmzalı)
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Temiz Kod, Açıklamalı Satırlar &amp; Scanner Kullanımı
              </span>
            </div>
            <CodeViewer onDownloadFile={handleDownloadJavaFile} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'algorithm') && (
          <section id="algorithm-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block"></span>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Döngü ve Matematik Analizi
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                i, j, k Değişkenleri ve Tek Sayılar Formülü
              </span>
            </div>
            <AlgorithmExplainer rows={rows} />
          </section>
        )}

        {/* Quick Reference Q&A / FAQ */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Sık Sorulan Sorular &amp; Java İpuçları</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1.5">
              <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">Q1:</span> Neden 2*(n-i)-1 formülü kullanılıyor?
              </h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Ters üçgenin her satırında tek sayıda yıldız (19, 17, 15, ..., 1) basılması ve üçgenin tepesinin tam ortada tek bir yıldızla bitmesi için ardışık tek sayılar kuralı uygulanır. <code className="text-amber-300 font-mono">2*(n-i)-1</code> bu diziyi tam olarak üretir.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1.5">
              <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">Q2:</span> Scanner ile veri alırken nelere dikkat edilmeli?
              </h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                <code className="text-cyan-300 font-mono">Scanner scanner = new Scanner(System.in);</code> ile klavye girişi açıldıktan sonra bellek sızıntısını önlemek adına program sonunda <code className="text-cyan-300 font-mono">scanner.close();</code> ile kaynak kapatılmalıdır.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-mono font-bold">TersUcgen.java</span>
            <span>•</span>
            <span>Java ile Döngüler ve Yıldız (*) Deseni</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Hazırlayan &amp; İmza:</span>
            <span className="font-semibold text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Enes Öztürk
            </span>
          </div>

          <div>
            <span>Tüm hakları saklıdır © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
