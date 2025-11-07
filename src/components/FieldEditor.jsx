import { useEffect, useState } from "react";
import { Pencil, Save } from "lucide-react";

export default function FieldEditor({ selections, onChange }) {
  const [local, setLocal] = useState([]);

  useEffect(() => {
    setLocal(selections);
  }, [selections]);

  const updateField = (id, key, value) => {
    const next = local.map((r) => (r.id === id ? { ...r, [key]: value } : r));
    setLocal(next);
    onChange(next);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Review & edit fields</h3>
        <div className="text-xs text-slate-500">{local.length} items</div>
      </div>

      {local.length === 0 ? (
        <p className="text-sm text-slate-500">No files parsed yet. Add PDFs or images to begin.</p>
      ) : (
        <div className="space-y-4">
          {local.map((row) => (
            <div key={row.id} className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div className="col-span-2">
                <label className="text-xs text-slate-500">File</label>
                <div className="text-sm font-medium text-slate-700 truncate" title={row.fileName}>{row.fileName}</div>
              </div>
              <div>
                <label className="text-xs text-slate-500">Vendor</label>
                <input
                  value={row.vendor || ""}
                  onChange={(e) => updateField(row.id, "vendor", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Invoice Date</label>
                <input
                  type="date"
                  value={row.invoiceDate || ""}
                  onChange={(e) => updateField(row.id, "invoiceDate", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Amount</label>
                <input
                  type="text"
                  value={row.amount || ""}
                  onChange={(e) => updateField(row.id, "amount", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Currency</label>
                <input
                  type="text"
                  value={row.currency || ""}
                  onChange={(e) => updateField(row.id, "currency", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="md:col-span-6">
                <label className="text-xs text-slate-500">Notes</label>
                <input
                  type="text"
                  value={row.notes || ""}
                  onChange={(e) => updateField(row.id, "notes", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
