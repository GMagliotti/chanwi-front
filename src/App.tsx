import './i18n'
import { ConfigProvider } from 'antd'
import { Routes, Route } from 'react-router'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import CustomLayout from './components/CustomLayout/CustomLayout'
import RegisterForm from './components/LoginForm/RegisterForm/RegisterForm'

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <CustomLayout>
        {
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterForm/>} />
          </Routes>
        }
      </CustomLayout>
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
