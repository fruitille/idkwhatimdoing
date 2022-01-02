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
  표가 유용했다는 의견이 있어<br/>
  결과 페이지에서 다운로드 가능하도록 하였습니다.
  <br/><br/>
  Table is Back.<br/>
  You can view and download in result section.
</div>`

function App() {

  const announceViewed = Boolean(window.localStorage.getItem("a_v_2"))

  const { lang, result } = useContext(AnotherContext)
  const message = require(`./language/${lang}.json`)

  useEffect(() => {
    if(!announceViewed) {
      window.localStorage.removeItem("a_v")
      Swal.fire({
        title: 'Feature Update - 22.01.02',
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
