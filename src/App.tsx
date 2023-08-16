import "./App.css";
import { useRef, useEffect } from "react";
import mac from "./assets/mac.svg";

function drawMac(ctx, BIG_H) {
  return new Promise((resolve, reject) => {
    const url = mac;
    const imgH = BIG_H * 0.7; // 336px / 201 70% of height
    const imgW = 426 * 0.4; // need to scale it proportionally
    // It's too complicated for now lets just draw it
    const img = new Image(imgW, imgH);
    img.src = url;
    img.onload = () => {
      ctx.drawImage(img, 200, 30, imgW, imgH);
      resolve(true);
    };
    // Nice!
  });
  // I need to draw it on my IPad.
  // I drew mac and vectorized it. Let's look at it
}

function saveCanvasAsImage(canvas) {
  // Convert the canvas content to a data URL
  const dataURL = canvas.toDataURL("image/png");

  // Create a link and set the data URL as the href
  const downloadLink = document.createElement("a"); // it's not the React way. But let's try it
  downloadLink.href = dataURL;

  // Set the filename for the image (you can change it if needed)
  downloadLink.download = "canvas_image.png";

  // Trigger a click event on the link to start the download
  downloadLink.click();
}

// Add a click event listener to the save button
// saveButton.addEventListener('click', saveCanvasAsImage);

function initCanvas(canvas: HTMLCanvasElement) {
  const BIG_W = 804;
  const BIG_H = 201;
  const AVATAR_SIZE = 160;
  const RADIUS = AVATAR_SIZE / 2;
  const AVATAR_X = 24 + RADIUS;
  const AVATAR_Y = BIG_H + RADIUS - 112; // it should be out of the canvas
  const EDIT_BTN_RIGHT = 20;
  const EDIT_BTN_TOP = 20;
  const EDIT_BTN_SIZE = 32;
  const EDIT_BTN_RADIUS = EDIT_BTN_SIZE / 2;
  // Now I want add extra border to photo and edit button
  const BORDER = 2;

  const ctx = canvas?.getContext("2d");
  canvas.width = BIG_W;
  canvas.height = BIG_H;
  ctx.fillStyle = "darkgray"; // No time to fix for TS Just ignore it
  ctx.fillRect(0, 0, BIG_W, BIG_H);
  ctx.fillStyle = "green";
  ctx.arc(
    AVATAR_X + BORDER / 2,
    AVATAR_Y,
    AVATAR_SIZE / 2 + BORDER,
    0,
    2 * Math.PI
  );

  ctx.arc(
    BIG_W - EDIT_BTN_RIGHT - EDIT_BTN_RADIUS - BORDER / 2,
    EDIT_BTN_TOP + EDIT_BTN_RADIUS,
    EDIT_BTN_RADIUS + BORDER,
    0,
    2 * Math.PI
  );
  // I think that I need to correct position. Or maybe not?
  // Let's just test it on LinkedIn
  // I can't see it. Why? Let's find out - go to browser - Yes, need to correct position
  ctx.fill();

  drawMac(ctx, BIG_H).then(() => {
    saveCanvasAsImage(canvas);
  });

  // I think that now time to think about funny decoration. I have an idea to draw an animal. For example, a cat? or a mouse?
  // or maybe dog? But why? It's Linked in let's draw something that connected to work. For example, a computer? But which computer?
  // Apple one? Not PC - I don't like PC. Let's do it
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef !== null) initCanvas(canvasRef.current);
  }, [canvasRef]);

  return <canvas ref={canvasRef}></canvas>;
}

export default App;
