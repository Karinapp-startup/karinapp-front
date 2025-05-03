interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="relative w-full min-w-[200px] max-w-[600px] h-2">
      {/* Barra de fondo */}
      <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-full" />

      {/* Barra de progreso */}
      <div 
        className="absolute inset-0 h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />

      {/* Segmentos divisores */}
      <div className="absolute inset-0 w-full h-full flex">
        {Array.from({ length: totalSteps - 1 }).map((_, index) => (
          <div
            key={index}
            className="flex-1 border-r border-white/50"
            style={{ marginLeft: index === 0 ? '1px' : '0' }}
          />
        ))}
      </div>
    </div>
  );
} 