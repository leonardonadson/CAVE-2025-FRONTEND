import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBid, formatCurrency } from "../context/bidContext";
import ActionButton from "../components/actionButton";
import { LogOut, FileDown, Trash2 } from "lucide-react";

const AdminPanel = () => {
  const { allBids, fetchAllBids, clearAllBids, generateReport, error } =
    useBid();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchAllBids) {
      fetchAllBids();
    }
  }, []);

  const handleGenerateReport = async (format: "csv" | "excel") => {
    try {
      if (generateReport) {
        await generateReport(format);
      }
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
    }
  };

  const handleClearAllBids = async () => {
    try {
      if (clearAllBids) {
        await clearAllBids();
        if (fetchAllBids) {
          await fetchAllBids();
        }
      }
    } catch (err) {
      console.error("Erro ao limpar lances:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center text-white w-full p-4 min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header com título e botão de logout */}
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Painel de Administração
        </h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-4 w-full max-w-4xl">
          {error}
        </div>
      )}

      <div className="w-full max-w-4xl flex flex-wrap gap-4 mb-6">
        <ActionButton onClick={() => handleGenerateReport("csv")}>
          <FileDown size={16} /> Exportar CSV
        </ActionButton>
        <ActionButton onClick={() => handleGenerateReport("excel")}>
          <FileDown size={16} /> Exportar Excel
        </ActionButton>
        <ActionButton
          onClick={handleClearAllBids}
          className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
        >
          <Trash2 size={16} /> Limpar Todos
        </ActionButton>
      </div>

      {/* Tabela */}
      <div className="w-full max-w-4xl overflow-x-auto rounded-lg border border-white/10 shadow-lg">
        <table className="min-w-full bg-gray-800">
          <thead className="bg-gray-700 text-gray-200 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">CPF</th>
              <th className="px-4 py-3 text-left">Telefone</th>
              <th className="px-4 py-3 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            {allBids?.length ? (
              allBids.map((bid, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  } hover:bg-gray-700 transition-colors`}
                >
                  <td className="px-4 py-2">{bid.name}</td>
                  <td className="px-4 py-2">{bid.cpf}</td>
                  <td className="px-4 py-2">{bid.phone}</td>
                  <td className="px-4 py-2 font-medium">
                    {formatCurrency(bid.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-400 italic"
                >
                  Nenhum lance registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
