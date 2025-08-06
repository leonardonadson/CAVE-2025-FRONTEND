import { useEffect } from "react";
import { useBid, formatCurrency } from "../context/bidContext";
import ActionButton from "../components/actionButton";

const AdminPanel = () => {
  const { allBids, fetchAllBids, clearAllBids, generateReport, error } =
    useBid();

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

  return (
    <div className="flex flex-col items-center text-white w-full p-4">
      <h2 className="text-2xl sm:text-3xl font-bold my-4">
        Painel de Administração
      </h2>

      {error && (
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-4 w-full">
          {error}
        </div>
      )}

      <div className="w-full flex gap-4 my-4">
        <ActionButton onClick={() => handleGenerateReport("csv")}>
          Exportar CSV
        </ActionButton>
        <ActionButton onClick={() => handleGenerateReport("excel")}>
          Exportar Excel
        </ActionButton>
        <ActionButton
          onClick={handleClearAllBids}
          className="bg-red-600 hover:bg-red-700"
        >
          Limpar Todos
        </ActionButton>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Telefone</th>
              <th className="px-4 py-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {allBids?.map((bid, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
              >
                <td className="px-4 py-2">{bid.name}</td>
                <td className="px-4 py-2">{bid.cpf}</td>
                <td className="px-4 py-2">{bid.phone}</td>
                <td className="px-4 py-2">{formatCurrency(bid.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
