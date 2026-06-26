"use client";

import { useState } from "react";

type Wish = {
  _id: string;
  name: string;
  attendance: "Hadir" | "Tidak Hadir";
  guests: number;
  message: string;
  createdAt: string;
};

type Stats = {
  total: number;
  totalHadir: number;
  totalTidakHadir: number;
  totalGuests: number;
};

export default function RSVPPage() {
  const [password, setPassword] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/rsvp?password=${encodeURIComponent(password)}`);
      if (res.status === 401) {
        setError("Password salah.");
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error("Gagal mengambil data.");

      const data = await res.json();
      setWishes(data.wishes);
      setStats(data.stats);
      setUnlocked(true);
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-sm text-center">
          <h1 className="text-white text-2xl mb-2" style={{ fontFamily: "var(--font-legan)" }}>
            RSVP Admin
          </h1>
          <p className="text-white/40 text-sm mb-6">Masukkan password untuk melihat data tamu</p>
          <form onSubmit={handleFetch} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30 transition"
              required
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black rounded-lg py-3 text-sm font-medium hover:bg-white/90 transition disabled:opacity-50"
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 print:py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 print:mb-4">
          <div>
            <h1 className="text-3xl print:text-2xl" style={{ fontFamily: "var(--font-legan)" }}>
              Daftar Tamu RSVP
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Diperbarui: {new Date().toLocaleString("id-ID")}
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="print:hidden bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
              <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
            </svg>
            Simpan PDF
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 print:mb-4 print:grid-cols-4">
            <div className="bg-[#111] border border-white/10 rounded-xl p-4 print:border-gray-300">
              <p className="text-white/40 text-xs mb-1">Total Responden</p>
              <p className="text-3xl font-light">{stats.total}</p>
            </div>
            <div className="bg-[#111] border border-white/10 rounded-xl p-4 print:border-gray-300">
              <p className="text-white/40 text-xs mb-1">Hadir</p>
              <p className="text-3xl font-light text-green-400">{stats.totalHadir}</p>
            </div>
            <div className="bg-[#111] border border-white/10 rounded-xl p-4 print:border-gray-300">
              <p className="text-white/40 text-xs mb-1">Tidak Hadir</p>
              <p className="text-3xl font-light text-red-400">{stats.totalTidakHadir}</p>
            </div>
            <div className="bg-[#111] border border-white/10 rounded-xl p-4 print:border-gray-300">
              <p className="text-white/40 text-xs mb-1">Total Tamu Hadir</p>
              <p className="text-3xl font-light text-blue-400">{stats.totalGuests}</p>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden print:border-gray-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 print:border-gray-300">
                <th className="text-left text-white/40 font-normal px-5 py-3 w-6">#</th>
                <th className="text-left text-white/40 font-normal px-5 py-3">Nama</th>
                <th className="text-left text-white/40 font-normal px-5 py-3">Kehadiran</th>
                <th className="text-left text-white/40 font-normal px-5 py-3">Jml. Tamu</th>
                <th className="text-left text-white/40 font-normal px-5 py-3">Pesan</th>
                <th className="text-left text-white/40 font-normal px-5 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {wishes.map((wish, i) => (
                <tr
                  key={wish._id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition print:border-gray-200"
                >
                  <td className="px-5 py-3 text-white/30">{i + 1}</td>
                  <td className="px-5 py-3 font-medium">{wish.name}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        wish.attendance === "Hadir"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {wish.attendance}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    {wish.attendance === "Hadir" ? wish.guests : "-"}
                  </td>
                  <td className="px-5 py-3 text-white/60 max-w-xs truncate">{wish.message}</td>
                  <td className="px-5 py-3 text-white/40 whitespace-nowrap">{formatDate(wish.createdAt)}</td>
                </tr>
              ))}
              {wishes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-white/30">
                    Belum ada data tamu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          * { color: black !important; }
          .print\\:border-gray-300 { border-color: #d1d5db !important; }
          .bg-\\[\\#0a0a0a\\], .bg-\\[\\#111\\] { background: white !important; }
        }
      `}</style>
    </div>
  );
}
