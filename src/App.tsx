import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from './components/organisms/Header';
import Footer from './components/atoms/Footer';
import MainPage from './components/pages/MainPage';
import ResultPage from './components/pages/ResultPage';
import { AnotherContext } from './contexts';

const announceHTML = `<div class="announce">
  GLOBAL 2.11.200 UPDATE<br/>
  제빌로 AS (Zeviro AS)
</div>`

function App() {

  const announceViewed = Boolean(window.localStorage.getItem("a_v_2"))

  const { lang, result } = useContext(AnotherContext)
  const message = require(`./language/${lang}.json`)

  useEffect(() => {
    if(!announceViewed) {
      window.localStorage.removeItem("a_v")
      Swal.fire({
        title: 'Update - 22.02.16',
        html: announceHTML,
        icon: 'success',
      }).then(() => {
        window.localStorage.setItem("a_v_2", "true")
      })
    }
  }, [announceViewed])

  return (
    <IntlProvider messages={message} locale={lang} defaultLocale='ko'>
      <Router basename="/anothercharcheck">
        <Header/>
        <Routes>
          <Route path="/" element={result ? <ResultPage/> : <MainPage />} />
        </Routes>
        <Footer/>
      </Router>
    </IntlProvider>
  );
}

export default App;
