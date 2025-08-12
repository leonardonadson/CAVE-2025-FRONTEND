import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBid, formatCurrency } from "../context/bidContext";
import ActionButton from "../components/actionButton";
import { LogOut, FileDown, Trash2, Copy, Check } from "lucide-react";

const formatCPF = (cpf: string) => {
  if (!cpf) return "";
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return cpf;
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const formatPhone = (phone: string) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return phone;
};

const AdminPanel = () => {
  const {
    allBids,
    fetchAllBids,
    clearAllBids,
    generateReport,
    error,
    highestBid,
  } = useBid();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    if (fetchAllBids) {
      fetchAllBids();
    }
  }, []);

  const highestBidder = useMemo(() => {
    if (!allBids || allBids.length === 0) return null;
    return allBids.find((bid) => bid.amount === highestBid);
  }, [allBids, highestBid]);

  const sortedBids = useMemo(() => {
    if (!allBids) return [];
    return [...allBids].sort((a, b) => b.amount - a.amount);
  }, [allBids]);

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(identifier);
      setTimeout(() => setCopiedItem(null), 2000);
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  const handleGenerateReport = async (format: "csv" | "excel") => {
    setIsDownloading(true);
    try {
      if (generateReport) {
        await generateReport(format);
      }
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClearAllBids = async () => {
    const isConfirmed = window.confirm(
      "Você tem certeza que deseja limpar todos os lances? Esta ação não pode ser desfeita."
    );
    if (isConfirmed) {
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center text-white w-full p-4 min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-4xl">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Painel de Administração
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-800 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-4 w-full">
            {error}
          </div>
        )}

        <div className="w-full bg-gray-800 p-6 rounded-lg mb-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">
            Maior Lance
          </h3>
          {highestBidder ? (
            <div>
              <p className="text-4xl font-bold text-green-400 mb-4">
                {formatCurrency(highestBidder.amount)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-400">Nome:</span>
                  <span className="text-white">{highestBidder.name}</span>
                   <button onClick={() => handleCopy(highestBidder.name, 'highest-name')} title="Copiar Nome">
                    {copiedItem === 'highest-name' ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-500 hover:text-blue-400 transition-colors" />}
                  </button>
                </div>
                 <div>
                  <span className="font-semibold text-gray-400">CPF: </span>
                  <span className="text-white">{formatCPF(highestBidder.cpf)}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="font-semibold text-gray-400">Telefone:</span>
                   <span className="text-white">{formatPhone(highestBidder.phone)}</span>
                   <button onClick={() => handleCopy(highestBidder.phone, 'highest-phone')} title="Copiar Telefone">
                    {copiedItem === 'highest-phone' ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-500 hover:text-blue-400 transition-colors" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-400">
              Nenhum lance registrado.
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <ActionButton
            onClick={() => handleGenerateReport("csv")}
            disabled={isDownloading || !allBids || allBids.length === 0}
          >
            {isDownloading ? "Gerando..." : <><FileDown size={16} /> Exportar CSV</>}
          </ActionButton>
          <ActionButton
            onClick={() => handleGenerateReport("excel")}
            disabled={isDownloading || !allBids || allBids.length === 0}
          >
            {isDownloading ? "Gerando..." : <><FileDown size={16} /> Exportar Excel</>}
          </ActionButton>
        </div>

        <div className="w-full overflow-x-auto rounded-lg border border-white/10 shadow-lg">
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
              {sortedBids.length > 0 ? (
                sortedBids.map((bid, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                    } hover:bg-gray-700 transition-colors`}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        {bid.name}
                        <button onClick={() => handleCopy(bid.name, `name-${index}`)} title="Copiar Nome">
                          {copiedItem === `name-${index}` ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-500 hover:text-blue-400 transition-colors" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">{formatCPF(bid.cpf)}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        {formatPhone(bid.phone)}
                        <button onClick={() => handleCopy(bid.phone, `phone-${index}`)} title="Copiar Telefone">
                          {copiedItem === `phone-${index}` ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-500 hover:text-blue-400 transition-colors" />}
                        </button>
                      </div>
                    </td>
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

        <div className="mt-12 text-center">
          <button
            onClick={handleClearAllBids}
            className="flex items-center justify-center mx-auto gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <Trash2 size={14} /> Limpar Todos os Lances
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;