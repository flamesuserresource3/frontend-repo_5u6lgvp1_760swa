import { Download } from "lucide-react";

export default function ResultsTable({ rows }) {
  const downloadCSV = () => {
    if (!rows || rows.length === 0) return;
    const headers = [
      "fileName",
      "vendor",
      "invoiceDate",
      "amount",
      "currency",
      "notes",
    ];
    const csv = [headers.join(",")]
      .concat(
        rows.map((r) =>
          headers
            .map((h) => `${String(r[h] ?? "").replaceAll('"', '""')}`)
            .map((cell) => (cell.includes(",") || cell.includes("\n") ? `"${cell}"` : cell))
            .join(",")
        )
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `extracted_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Extracted results</h3>
        <button
          onClick={downloadCSV}
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          disabled={!rows || rows.length === 0}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {(!rows || rows.length === 0) ? (
        <p className="text-sm text-slate-500">No data yet.</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="px-3 py-2">File</th>
                <th className="px-3 py-2">Vendor</th>
                <th className="px-3 py-2">Invoice Date</th>
                <th className="px-3 py-2 text-right">Amount</th>
                <th className="px-3 py-2">Currency</th>
                <th className="px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-2 max-w-[280px] truncate" title={r.fileName}>{r.fileName}</td>
                  <td className="px-3 py-2">{r.vendor}</td>
                  <td className="px-3 py-2">{r.invoiceDate}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.amount}</td>
                  <td className="px-3 py-2">{r.currency}</td>
                  <td className="px-3 py-2">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
