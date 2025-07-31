import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      semi: ['error', 'never'], // ← 禁用分號
      ["no-unused-expressions"]: "off",
      ["@typescript-eslint/no-unused-expressions"]: "off"
    },
  },
  // 加上 Prettier 的覆蓋設定（Flat Config 寫法）
  {
    name: 'prettier',
    ...prettierConfig,
  },
];

export default eslintConfig;
