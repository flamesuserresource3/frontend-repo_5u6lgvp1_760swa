import { useCallback, useState } from "react";
import { UploadCloud, FileText, Image as ImageIcon, X } from "lucide-react";

export default function UploadZone({ onFilesParsed }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const incoming = Array.from(e.dataTransfer.files || []);
      handleAddFiles(incoming);
    },
    []
  );

  const handleAddFiles = (incoming) => {
    const accepted = incoming.filter((f) => /pdf|image\//.test(f.type) || f.name.toLowerCase().endsWith(".pdf"));
    const next = [...files, ...accepted];
    setFiles(next);
    // Simulate lightweight parsing using filename heuristics
    const parsed = accepted.map((f) => heuristicParse(f));
    onFilesParsed((prev) => [...prev, ...parsed]);
  };

  const handleInput = (e) => {
    const incoming = Array.from(e.target.files || []);
    handleAddFiles(incoming);
  };

  const removeFile = (idx) => {
    const copy = [...files];
    copy.splice(idx, 1);
    setFiles(copy);
  };

  const prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section
      onDrop={onDrop}
      onDragOver={prevent}
      onDragEnter={prevent}
      className="w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6 text-center hover:border-indigo-400 transition-colors"
    >
      <div className="mx-auto max-w-xl">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-indigo-50 text-indigo-600">
          <UploadCloud size={22} />
        </div>
        <h3 className="text-lg font-semibold">Drag and drop PDFs or images</h3>
        <p className="mt-1 text-sm text-slate-600">PNG, JPG, and PDF up to ~10MB each</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <input type="file" multiple accept="application/pdf,image/*" className="hidden" onChange={handleInput} />
            <UploadCloud size={16} />
            Browse files
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-2">
            {files.map((f, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-2">
                <div className="flex items-center gap-3 text-slate-700">
                  {f.type.includes("pdf") || f.name.toLowerCase().endsWith(".pdf") ? (
                    <FileText size={18} className="text-indigo-600" />
                  ) : (
                    <ImageIcon size={18} className="text-indigo-600" />
                  )}
                  <div className="text-sm">
                    <p className="font-medium line-clamp-1">{f.name}</p>
                    <p className="text-xs text-slate-500">{(f.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="inline-flex items-center rounded-md p-1 text-slate-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function heuristicParse(file) {
  // Extract simple fields from filename patterns like vendor_date_amount.pdf
  const base = file.name.replace(/\.[^/.]+$/, "");
  const parts = base.split(/[_-]+/);
  let vendor = parts[0] || "Unknown";
  let date = parts.find((p) => /\d{4}[01]?\d[0-3]?\d/.test(p)) || ""; // yyyymmdd
  if (date && date.length === 8) {
    date = `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
  }
  let amount = parts
    .map((p) => p.replace(/[^0-9.]/g, ""))
    .find((p) => /\d+\.\d{2}/.test(p)) || "";

  return {
    id: crypto.randomUUID(),
    fileName: file.name,
    vendor: capitalize(vendor),
    invoiceDate: date,
    amount: amount,
    currency: amount ? "USD" : "",
    notes: ""
  };
}

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
