import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe, ShieldCheck, Terminal, Layers } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const ghPagesCommands = `npm run build`;
  const cfPagesCommands = `Build command: npm run build\nBuild output directory: dist`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-8">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/30 rounded-xl text-emerald-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold">Deploy to GitHub Pages & Cloudflare Pages</h2>
              <p className="text-xs text-slate-400">100% Client-Side Compatible & Static Ready</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-slate-700 dark:text-slate-300">
          
          {/* Status Badge */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">
                Pre-configured for Static Hosting
              </div>
              <div className="text-emerald-800 dark:text-emerald-300 leading-relaxed">
                This applet contains <code className="bg-emerald-100 dark:bg-emerald-900 px-1 py-0.5 rounded font-mono">public/_redirects</code> for Cloudflare Pages and <code className="bg-emerald-100 dark:bg-emerald-900 px-1 py-0.5 rounded font-mono">public/404.html</code> for GitHub Pages. All forms submit directly to <strong>kerdfarms@gmail.com</strong> via FormSubmit AJAX.
              </div>
            </div>
          </div>

          {/* Option 1: Cloudflare Pages */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs">1</span>
                Deploy on Cloudflare Pages (Recommended - 1 Min)
              </h3>
              <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">
                FASTEST
              </span>
            </div>

            <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
              <li>Push this repository to GitHub or upload code to Cloudflare Pages.</li>
              <li>In Cloudflare Dashboard, go to <strong>Workers & Pages ➔ Create ➔ Pages</strong>.</li>
              <li>Connect your Git repository.</li>
              <li>Set build settings:
                <div className="mt-2 bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] relative">
                  <div>Build command: <span className="text-emerald-400">npm run build</span></div>
                  <div>Build output directory: <span className="text-emerald-400">dist</span></div>
                </div>
              </li>
              <li>Click <strong>Save and Deploy</strong>. Cloudflare will host your site with free SSL and lightning speed!</li>
            </ol>
          </div>

          {/* Option 2: GitHub Pages */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
                Deploy on GitHub Pages
              </h3>
            </div>

            <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
              <li>In your GitHub Repository settings, go to <strong>Pages ➔ Build and deployment</strong>.</li>
              <li>Select <strong>Source: GitHub Actions</strong> (or set branch to <code className="font-mono">gh-pages</code> / <code className="font-mono">dist</code> folder).</li>
              <li>To deploy via CLI or <code className="font-mono">gh-pages</code> package:
                <div className="mt-2 bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] relative flex justify-between items-center">
                  <code>npx gh-pages -d dist</code>
                  <button
                    onClick={() => copyToClipboard('npx gh-pages -d dist', 'gh')}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    {copiedCode === 'gh' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </li>
              <li>Your site will be live at <code className="font-mono text-emerald-600 dark:text-emerald-400">https://yourusername.github.io/kerdfarms/</code>!</li>
            </ol>
          </div>

          {/* Form & Order Handling Summary */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white">Form & Order Handling Summary</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
              <li><strong>Target Email:</strong> All enquiries and MoMo orders are emailed directly to <strong className="text-slate-900 dark:text-white">kerdfarms@gmail.com</strong>.</li>
              <li><strong>Mobile Money:</strong> Customers pay to MTN 055 123 4567 or Telecel 024 013 5545, then click "I Have Paid & Submit Order".</li>
              <li><strong>Order ID Tracking:</strong> Orders are stored in local storage and can be tracked using their Order ID (`#KF-XXXXX`).</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Got It! Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
