import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import ResumeGenerator from './pages/ResumeGenerator';
import Form from './components/Form';
import History from './pages/History';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resumeGenerator" element={<ResumeGenerator />} />
        <Route path="/form" element={<Form />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
