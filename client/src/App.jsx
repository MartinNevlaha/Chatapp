import './App.scss';

import { useTranslation } from 'react-i18next';
import Topbar from "./components/Menu/Topbar/Topbar";

function App() {
  const {t} = useTranslation();
  return (
    <div className="App">
      <Topbar />
      <h1>{t("mainContent.title")}</h1>
    </div>
  );
}

export default App;
