import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/Main';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* 쉼터 메인페이지 */}
        <Route path='/' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
