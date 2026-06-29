import { FcSimCardChip } from "react-icons/fc";
import { LuNfc } from "react-icons/lu";

export default function CardFront({ nome, numero }) {
  return (
    <div className="w-[90%] max-w-[400px] h-[220px] md:h-[260px] bg-black rounded-xl p-4 flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-[40px] h-[40px] bg-white rounded-full"></div>
          <div className="w-[30px] h-[30px] bg-white rounded-full"></div>
        </div>
        <p className="text-white text-sm md:text-lg">Nome do Banco</p>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <FcSimCardChip size={50} />
          <LuNfc size={25} color="#fff" />
        </div>

        <p className="text-gray-400 text-lg md:text-2xl mt-2">
          {numero || "0000 0000 0000 0000"}
        </p>
      </div>

      <p className="text-white text-lg md:text-xl">
        {nome || "Nome no cartão"}
      </p>
    </div>
  );
}