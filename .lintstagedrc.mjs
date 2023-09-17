export default {
  "**/*.{mjs,cjs,js,ts,jsx,tsx,vue}": [
    "eslint --fix",
    "prettier --write --ignore-unknown",
  ],
  "**/!(*.{mjs,cjs,js,ts,jsx,tsx,vue})": "prettier --write --ignore-unknown",
};
