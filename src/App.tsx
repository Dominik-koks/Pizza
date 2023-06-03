import React from 'react';
import './scss/app.scss'

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import MainLayouts from './Layouts/MainLayouts';




function App() {

return (

        
            <Routes>
                <Route path='/' element={<MainLayouts />} >
                    <Route path='' element={<Home />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='pizza/:id' element={<FullPizza />} />
                </Route>
            
            </Routes>
  );
}

export default App;





