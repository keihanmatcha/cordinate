import { Button } from '@/components/ui/button';

export const Review = () => {
  const choices = [
    { label: 'あつい', color: 'bg-orange-400' },
    { label: 'さむい', color: 'bg-blue-400' },
    { label: 'ちょうどいい', color: 'bg-green-400' },
    { label: 'かさばる', color: 'bg-gray-400' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 space-y-8 bg-indigo-900 text-white">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">今日のコーデはどうだった？</h3>
        <p className="text-sm opacity-70">選んだ服の精度がどんどん上がるよ！</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {choices.map((c) => (
          <Button key={c.label} className={`${c.color} h-20 text-lg rounded-2xl shadow-xl`}>
            {c.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
