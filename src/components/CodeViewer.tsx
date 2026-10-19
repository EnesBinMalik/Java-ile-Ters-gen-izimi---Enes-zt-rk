import React, { useState } from 'react';
import { FileCode, Copy, Check, Download, ExternalLink, Code2 } from 'lucide-react';
import { CODE_SNIPPETS, CodeSnippet } from '../data/javaCode';

interface CodeViewerProps {
  onDownloadFile: (filename: string, content: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onDownloadFile }) => {
  const [selectedTab, setSelectedTab] = useState<string>('classic');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet: CodeSnippet =
    CODE_SNIPPETS.find((s) => s.id === selectedTab) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    onDownloadFile(activeSnippet.filename, activeSnippet.code);
  };

  // Simple clean syntax highlight tokenizer for Java code lines
  const renderHighlightedLine = (line: string) => {
    // If it's a comment
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      const isEnes = line.includes('Enes Öztürk');
      return (
        <span className={isEnes ? 'text-amber-300 font-semibold italic' : 'text-slate-500 italic'}>
          {line}
        </span>
      );
    }

    // Split by string literals first
    const parts = line.split(/(".*?")/g);

    return parts.map((part, index) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return (
          <span key={index} className="text-emerald-300">
            {part}
          </span>
        );
      }

      // Tokenize words
      const words = part.split(/(\b\w+\b|[^\w\s])/g);

      return words.map((token, wIdx) => {
        const keywords = [
          'public', 'class', 'static', 'void', 'int', 'for', 'while', 'import',
          'new', 'return', 'if', 'else', 'package', 'boolean'
        ];
        const types = ['Scanner', 'System', 'String'];
        const methods = ['println', 'print', 'nextInt', 'close', 'main'];

        if (keywords.includes(token)) {
          return (
            <span key={wIdx} className="text-purple-400 font-semibold">
              {token}
            </span>
          );
        }
        if (types.includes(token)) {
          return (
            <span key={wIdx} className="text-cyan-300 font-medium">
              {token}
            </span>
          );
        }
        if (methods.includes(token)) {
          return (
            <span key={wIdx} className="text-blue-300">
              {token}
            </span>
          );
        }
        if (/^\d+$/.test(token)) {
          return (
            <span key={wIdx} className="text-amber-400">
              {token}
            </span>
          );
        }

        return <span key={wIdx}>{token}</span>;
      });
    });
  };

  const lines = activeSnippet.code.split('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Code Header & Tabs */}
      <div className="border-b border-slate-800 bg-slate-950/80 px-4 pt-3 flex flex-wrap items-center justify-between gap-3">
        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
          {CODE_SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setSelectedTab(snippet.id)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                selectedTab === snippet.id
                  ? 'bg-slate-900 text-amber-300 border-amber-500 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>{snippet.filename}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pb-2 sm:pb-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors cursor-pointer"
            title="Panoya Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs transition-colors font-medium cursor-pointer"
            title="Java Dosyası Olarak İndir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.java İndir</span>
          </button>
        </div>
      </div>

      {/* Description Banner */}
      <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
        <span>{activeSnippet.description}</span>
        <span className="hidden sm:inline-block font-mono text-amber-400/80 text-[11px]">
          İmza: Enes Öztürk
        </span>
      </div>

      {/* Code Body */}
      <div className="p-4 sm:p-5 bg-slate-950 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-300 select-text max-h-[550px] overflow-y-auto">
        <pre className="table w-full">
          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className="hover:bg-slate-900/60 transition-colors">
                <td className="table-cell pr-4 py-0.5 text-right select-none text-slate-600 w-10 text-[11px]">
                  {index + 1}
                </td>
                <td className="table-cell py-0.5 whitespace-pre">
                  {renderHighlightedLine(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </pre>
      </div>

      {/* Compilation Instructions Footer */}
      <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Code2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            Terminalde derlemek ve çalıştırmak için:
          </span>
          <code className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono text-emerald-300">
            javac {activeSnippet.filename} &amp;&amp; java {activeSnippet.filename.replace('.java', '')}
          </code>
        </div>
        <div className="text-slate-500 text-[11px] font-mono">
          Java 8+ Uyumlu
        </div>
      </div>
    </div>
  );
};
