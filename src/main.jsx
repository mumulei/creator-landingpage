import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LocaleProvider } from './i18n/locale';

createRoot(document.getElementById('root')).render(
  <LocaleProvider><App /></LocaleProvider>,
)
