import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/bt-react/", // <-- rất quan trọng để GitHub Pages hoạt động đúng
  plugins: [react()],
});
