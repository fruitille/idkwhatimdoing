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


  const announceViewed = Boolean(window.localStorage.getItem("a_v"))

  const { lang, result } = useContext(AnotherContext)
  const message = require(`./language/${lang}.json`)

  useEffect(() => {
    if(!announceViewed) {
      Swal.fire({
        title: '공지사항',
        html: '사이트가 리뉴얼되었습니다.<br>캐릭터 체크를 다시 해 주세요.',
        icon: 'success',
      }).then(() => {
        window.localStorage.setItem("a_v", "true")
      })
    }
  }, [announceViewed])

  return (
    <IntlProvider messages={message} locale={lang}>
      <Router>
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
