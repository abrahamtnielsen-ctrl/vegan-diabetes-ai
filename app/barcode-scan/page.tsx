"use client";
import { useState } from "react";
import { QrCode, Loader2, ScanLine } from "lucide-react";
import BarcodeResult from "@/components/BarcodeResult";
import { scanBarcode, BarcodeResult as BarcodeResultType } from "@/lib/mockApi";

export default function BarcodeScanPage() {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BarcodeResultType | null>(null);

  const handleScan = async () => {
    if (!barcode.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await scanBarcode(barcode);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Barcode Scanner</h1>
        <p className="text-slate-500 mt-1">Scan or enter a product barcode to check its vegan and diabetes suitability.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="relative bg-slate-900 rounded-xl overflow-hidden h-48 flex items-center justify-center">
          <QrCode className="h-20 w-20 text-slate-700" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-28 relative">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-green-400 rounded-tl" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-green-400 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-green-400 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-green-400 rounded-br" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green-400 opacity-80 animate-pulse" />
            </div>
          </div>
          <p className="absolute bottom-3 text-xs text-slate-500">Camera not available in demo mode</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Enter Barcode Manually</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleScan(); }}
              placeholder="e.g., 012345678905"
              className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleScan}
              disabled={loading || !barcode.trim()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold py-3 px-5 rounded-lg transition-colors whitespace-nowrap"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
              {loading ? "Scanning..." : "Analyze Product"}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Try any barcode number - demo returns simulated results.</p>
        </div>
      </div>

      {result && <BarcodeResult result={result} />}
    </div>
  );
}
