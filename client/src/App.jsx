import './App.scss';

import { useTranslation } from 'react-i18next';
import Layout from "./HOC/Layout";

function App() {
  const {t} = useTranslation();
  return (
    <div className="App">
      <Layout>
        <h1>{t("mainContent.title")}</h1>
      </Layout>
    </div>
  );
}

export default App;
