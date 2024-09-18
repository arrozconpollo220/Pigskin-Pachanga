import { useState } from 'react'
import Footer from './components/Footer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Headers/>
      <main className="mx-3">
      <Outlet />
    </main>

      <Footer />
    </div>
  );
}

export default App
