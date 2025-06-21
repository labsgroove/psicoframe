import { useEffect, useRef } from "react";

const MinimalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "none";
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let hue = 0;

    const render = () => {
      hue = (hue + 0.2) % 360;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${hue}, 60%, 10%)`);
      gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 60%, 10%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      />
      <img
        src="https://i.ibb.co/wrgXPg34/friend.png"
        alt="Friend"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "100vh",
          width: "auto",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default MinimalBackground;
