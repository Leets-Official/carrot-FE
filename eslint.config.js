import js from "@eslint/js"; // ESLint의 기본 JavaScript 규칙들을 가져옴
import globals from "globals"; // 브라우저 전역 변수(예: window, document)를 허용
import react from "eslint-plugin-react"; // React 관련 ESLint 규칙 플러그인
import reactHooks from "eslint-plugin-react-hooks"; // React Hooks 관련 ESLint 규칙 플러그인
import reactRefresh from "eslint-plugin-react-refresh"; // React Fast Refresh 규칙 플러그인 (개발 중 핫 리로드 지원)

export default [
  { ignores: ["dist"] }, // 'dist' 폴더는 ESLint 검사를 무시
  {
    files: ["**/*.{js,jsx}"], // 검사 대상 파일들 (JavaScript 및 JSX 파일)
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 문법 지원
      globals: globals.browser, // 브라우저 환경 전역 변수를 허용
      parserOptions: {
        ecmaVersion: "latest", // 최신 ECMAScript 문법 지원
        ecmaFeatures: { jsx: true }, // JSX 문법을 허용 (React에서 사용)
        sourceType: "module", // ECMAScript 모듈(ESM) 사용
      },
    },
    plugins: {
      react, // React 관련 ESLint 규칙 적용
      "react-hooks": reactHooks, // React Hooks 관련 규칙 적용
      "react-refresh": reactRefresh, // React Fast Refresh 관련 규칙 적용 (개발 중 핫 리로드)
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint 기본 권장 규칙 적용
      ...react.configs.recommended.rules, // React 권장 규칙 적용
      ...react.configs["jsx-runtime"].rules, // JSX 런타임 관련 규칙 적용 (React 17+에서 JSX 필요 없음)
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙 적용
      "react/jsx-no-target-blank": "off", // target="_blank" 보안 경고를 비활성화 (필요 시 사용)
      "react/react-in-jsx-scope": "on", // React import 검사 규칙 비활성화
    },
  },
];
