import { ReceiptText, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white grid place-items-center shadow-sm">
            <ReceiptText size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">DocExtract</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Scan PDFs & images to capture accounting fields</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
          <Settings size={16} />
          Settings
        </button>
      </div>
    </header>
  );
}
