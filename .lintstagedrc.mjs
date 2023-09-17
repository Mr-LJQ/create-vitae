export default {
  "**/*.{js,ts,jsx,tsx,vue}": [
    "eslint --fix",
    "prettier --write --ignore-unknown",
  ],
  "**/!(*.{js,ts,jsx,tsx,vue})": "prettier --write --ignore-unknown",
};
