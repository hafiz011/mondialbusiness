// app/admin/form-data/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "@/lib/axios";
import { saveAs } from "file-saver";
import { Download, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, EyeOff } from "lucide-react";

interface FormDataType {
  id: string;
  prenom: string;
  email: string;
  pays: string;
  typeProjet: string;
  idee: string;
  pourquoi: string;
  peur: string;
  temps: string;
  budget: string;
  conditions: boolean;
  createdAt?: string;
}

const ITEMS_PER_PAGE = 10;

const FormDataPage: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get<FormDataType[]>("/Formdata/all");
        const data = Array.isArray(response.data) ? response.data : [];
        data.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        setFormData(data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load form submissions");
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const filteredData = useMemo(() => {
    return formData.filter((item) =>
      [item.prenom, item.email, item.pays, item.typeProjet]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [formData, search]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDownloadCSV = () => {
    if (formData.length === 0) return;

    const headers = [
      "No",
      "Prénom",
      "Email",
      "Pays",
      "Type de projet",
      "Idée",
      "Pourquoi",
      "Peur",
      "Temps disponible",
      "Budget",
      "Conditions acceptées",
      "Date de soumission",
    ];

    const rows = formData.map((item, idx) => [
      idx + 1,
      item.prenom,
      item.email,
      item.pays,
      item.typeProjet,
      `"${item.idee.replace(/"/g, '""')}"`,
      `"${item.pourquoi.replace(/"/g, '""')}"`,
      `"${item.peur.replace(/"/g, '""')}"`,
      item.temps,
      item.budget,
      item.conditions ? "Oui" : "Non",
      item.createdAt || "N/A",
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `form-submissions-${new Date().toISOString().split("T")[0]}.csv`);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
        <p className="text-gray-600 mt-2">
          Total: {formData.length} submission{formData.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search & Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, country or project type..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-md"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Idea (summary)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Conditions</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => {
                  const isExpanded = expandedRows.has(item.id);
                  const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;

                  return (
                    <React.Fragment key={item.id}>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-800">{globalIndex}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.prenom}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.pays}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.typeProjet}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                          <p className="truncate block">{item.idee || "-"}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.conditions ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleRow(item.id)}
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            {isExpanded ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="px-6 py-6 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                              <div>
                                <p className="font-semibold text-gray-800 mb-2">Full Idea</p>
                                <p className="text-gray-700 whitespace-pre-wrap">{item.idee || "—"}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 mb-2">Why this project?</p>
                                <p className="text-gray-700 whitespace-pre-wrap">{item.pourquoi || "—"}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 mb-2">Biggest Fear</p>
                                <p className="text-gray-700 whitespace-pre-wrap">{item.peur || "—"}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800 mb-2">Available Time & Budget</p>
                                <p className="text-gray-700">
                                  <span className="font-medium">Time:</span> {item.temps || "—"}<br />
                                  <span className="font-medium">Budget:</span> {item.budget || "—"}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    {search ? "No results match your search." : "No form submissions yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="px-4 py-2 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDataPage;
