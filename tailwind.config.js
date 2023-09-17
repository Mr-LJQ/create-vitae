/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    //element-plus 对el-button 设置的默认样式会被 tailwind 的 preflight 中设置的 button样式影响，
    // 因此为了避免冲突，禁用 preflight 的样式。
    preflight: false,
  },
};
