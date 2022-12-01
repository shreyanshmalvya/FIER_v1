import './App.css'
import Navbar from './components/navbar/Navbar'
import AddFIR from './components/addFIR/AddFIR'
import { TransactionProvider } from './context/TransactionContext'


function App() {

  return (
    <TransactionProvider>
      <div className="App">
        <Navbar />
        <AddFIR />
      </div>
    </TransactionProvider>
  )
}

export default App
