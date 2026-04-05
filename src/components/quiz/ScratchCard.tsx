import { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  onReveal: () => void;
  children: React.ReactNode;
}

export default function ScratchCard({ width, height, onReveal, children }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#6C4FBF');
    gradient.addColorStop(1, '#9B7FE6');
    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, width, height, 16);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Raspa aquí ✨', width / 2, height / 2 - 8);
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('para revelar tu descuento', width / 2, height / 2 + 18);
  }, [width, height]);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, width, height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    if (cleared / (width * height) > 0.35) {
      setRevealed(true);
      onReveal();
      ctx.clearRect(0, 0, width, height);
    }
  }, [width, height, revealed, onReveal]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
    };
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  return (
    <div className="relative inline-block w-full" style={{ maxWidth: width, aspectRatio: `${width}/${height}` }}>
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-card border-2 border-primary/20 overflow-hidden">
        {children}
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer"
          style={{ touchAction: 'none' }}
          onMouseDown={() => { isDrawing.current = true; }}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onMouseMove={handleMove}
          onTouchStart={() => { isDrawing.current = true; }}
          onTouchEnd={() => { isDrawing.current = false; }}
          onTouchMove={handleMove}
        />
      )}
    </div>
  );
}
