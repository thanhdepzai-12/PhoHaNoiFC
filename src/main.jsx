import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlayersProvider } from './Context/useContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
<PlayersProvider>
  <App />
</PlayersProvider>

)
