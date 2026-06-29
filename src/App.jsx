import { useState } from "react";
import BackCard from "./components/BackCard";
import CardFront from "./components/FrontCard";
import { ToastContainer, toast } from "react-toastify";
import instance from "./api/instance";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [cvv, setCvv] = useState("");
  const [senha, setSenha] = useState("");

  // 🔢 Formatar número do cartão
  function formatNumero(e) {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.substring(0, 16);
    valor = valor.replace(/(\d{4})/g, "$1 ").trim();
    setNumero(valor);
  }

  // 💳 Função pagar
  async function pagar() {
    console.log("Tentando pagamento...");

    if (!nome || !numero || !mes || !ano || !cvv || !senha) {
      return toast.error("Preencha todos os campos");
    }

    const numeroLimpo = numero.replace(/\s/g, "");

    if (numeroLimpo.length !== 16) {
      return toast.error("Número do cartão inválido");
    }

    if (cvv.length !== 3) {
      return toast.error("CVV inválido");
    }

    if (ano.length !== 2) {
      return toast.error("Ano inválido");
    }

    if (Number(mes) > 12 || Number(mes) < 1) {
      return toast.error("Mês inválido");
    }

    if (senha.length < 4) {
      return toast.error("Senha inválida");
    }

    try {
      const response = await instance.post("/creditcards", {
        name: nome,
        number: numeroLimpo,
        expiration: `${mes}/${ano}`,
        cvv,
        password: senha,
      });

      console.log("Resposta API:", response.data);
      toast.success("Pagamento realizado com sucesso 🎉");
    } catch (error) {
      console.log("Erro real:", error);

      // 👇 MODO SIMULADO PROFISSIONAL
      toast.warning("Servidor indisponível. Entrando no modo demonstração...");

      setTimeout(() => {
        toast.success("Pagamento simulado (modo demonstração) ✅");
      }, 1500);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <ToastContainer theme="colored" />

      {/* CARTÕES */}
      <div className="w-full md:w-[40%] bg-[#271540] flex flex-col items-center py-10 gap-6">
        <CardFront nome={nome} numero={numero} />
        <BackCard cvv={cvv} />
      </div>

      {/* FORM */}
      <div className="w-full md:w-[40%] p-6 flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
          Preencha os campos para concluir o pagamento
        </h1>

        <div className="w-full max-w-[500px] flex flex-col gap-4">
          <input
            placeholder="Nome no cartão"
            onChange={(e) => setNome(e.target.value)}
            className="h-[45px] bg-gray-200 px-2 rounded"
          />

          <input
            placeholder="Número do cartão"
            value={numero}
            onChange={formatNumero}
            className="h-[45px] bg-gray-200 px-2 rounded"
          />

          <div className="flex gap-2">
            <input
              placeholder="MM"
              maxLength={2}
              onChange={(e) => setMes(e.target.value)}
              className="w-1/2 h-[45px] bg-gray-200 px-2 rounded"
            />
            <input
              placeholder="AA"
              maxLength={2}
              onChange={(e) => setAno(e.target.value)}
              className="w-1/2 h-[45px] bg-gray-200 px-2 rounded"
            />
            <input
              placeholder="CVV"
              maxLength={3}
              onChange={(e) => setCvv(e.target.value)}
              className="w-1/2 h-[45px] bg-gray-200 px-2 rounded"
            />
          </div>

          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            className="h-[45px] bg-gray-200 px-2 rounded"
          />

          <button
            type="button"
            onClick={pagar}
            className="h-[50px] bg-[#271540] text-white font-bold rounded hover:opacity-90"
          >
            PAGAR
          </button>
        </div>
      </div>
    </div>
  );
}