import { ConfigProvider, Button } from 'antd'
import { Routes, Route } from 'react-router'
import './App.css'
import './i18n'
import LoginForm from './components/loginForm'

const Landing: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to My App</h1>
      <Button type="primary" onClick={() => alert('Button clicked!')}>
        Click Me
      </Button>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Routes>
        <Route path='/' element={<LoginForm />} />
      </Routes>
    </ConfigProvider>
  )
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
