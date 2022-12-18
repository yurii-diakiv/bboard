import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'components';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { store } from 'store/store';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Router>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </Router>
        <Toaster />
    </Provider>
);

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <Router>
//                 <DndProvider backend={HTML5Backend}>
//                     <App />
//                 </DndProvider>
//             </Router>
//             <Toaster />
//         </Provider>
//     </React.StrictMode >,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
