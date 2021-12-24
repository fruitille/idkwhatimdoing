import React, { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from './components/organisms/Header';
import Footer from './components/atoms/Footer';
import MainPage from './components/pages/MainPage';
import ResultPage from './components/pages/ResultPage';
import { AnotherContext } from './contexts';

function App() {


  const announceViewed = Boolean(window.localStorage.getItem("a_v_2"))

  const { lang, result } = useContext(AnotherContext)
  const message = require(`./language/${lang}.json`)

  useEffect(() => {
    if(!announceViewed) {
      window.localStorage.removeItem("a_v")
      Swal.fire({
        title: 'Update - JAP 2.11.60',
        html: '플람라피스 + 1캐릭 추가<br>Add Flamlapis + 1 Character',
        icon: 'success',
      }).then(() => {
        window.localStorage.setItem("a_v_2", "true")
      })
    }
  }, [announceViewed])

  return (
    <IntlProvider messages={message} locale={lang}>
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