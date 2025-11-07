import { useState } from "react";
import Header from "./components/Header";
import UploadZone from "./components/UploadZone";
import FieldEditor from "./components/FieldEditor";
import ResultsTable from "./components/ResultsTable";

export default function App() {
  const [rows, setRows] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <UploadZone onFilesParsed={setRows} />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <FieldEditor selections={rows} onChange={setRows} />
            <ResultsTable rows={rows} />
          </div>
        </div>
      </main>
    </div>
  );
}
