import { useRef, useEffect } from "react";

function RandomDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dAmt = 1000;

    for (let i = 0; i < dAmt; i++) {
      let al = Math.random() * 255;
      let r_col = Math.random() * (255 - 150) + 150;
      let g_col = Math.random() * (255 - 150) + 150;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let r = Math.random() * (10 - 3) + 3;

      ctx.fillStyle = `rgba(${r_col}, ${g_col}, 0, ${al})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, []);

  return <canvas ref={canvasRef} width={1920} height={1080} />;
}

export default RandomDots;
