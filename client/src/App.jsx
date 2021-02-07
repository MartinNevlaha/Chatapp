import './App.scss';
import Topbar from './components/Topbar/Topbar';
import { useTranslation } from 'react-i18next';

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
