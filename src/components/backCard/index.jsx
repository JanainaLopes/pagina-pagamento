export default function BackCard({ cvv }) {
  return (
    <div className="w-[90%] max-w-[400px] h-[220px] md:h-[260px] bg-black rounded-xl flex flex-col">
      <div className="h-[60px] bg-gray-700 mt-4"></div>

      <div className="flex justify-center items-center flex-1">
        <div className="w-[80%] h-[40px] bg-gray-300 flex justify-end items-center px-2">
          <p className="text-black text-lg">
            {cvv || "000"}
          </p>
        </div>
      </div>
    </div>
  );
}