type LogoProps = {
  size?: number;
  showText?: boolean;
};

export default function Logo({
  size = 48,
  showText = true,
}: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg"
        style={{
          width: size,
          height: size,
        }}
      >
        AI
      </div>

      {showText && (
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            AgriVision AI
          </h1>

          <p className="text-sm text-slate-500">
            Real-Time Crop Analytics
          </p>
        </div>
      )}
    </div>
  );
}