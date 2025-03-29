import './i18n'
import { ConfigProvider } from 'antd'
import { Routes, Route } from 'react-router'
import './App.css'
import LoginPage from './pages/GenericPage/GenericPage'
import CustomLayout from './components/CustomLayout/CustomLayout'
import RegisterForm from './components/RegisterForm/RegisterForm'
import ReceiptCard from './components/Receipt/ReceiptCard'
import ReceiverCard from './components/ReceiverCard/ReceiverCard'
import { dummyOrder, dummyPosts, dummyProducer } from './dummies'
import ReceiverPurchasePage from './pages/ReceiverPurchasePage/ReceiverPurchasePage'
import ProducerPostsManagementPage from './pages/ProducerPostsManagementPage/ProducerPostsManagementPage'
import ProducerPostCreationPage from './pages/ProducerPostCreationPage/ProducerPostCreationPage'
import ReceiverPage from './pages/ReceiverPage/ReceiverPage'
import GenericPage from './pages/GenericPage/GenericPage'
import LoginForm from './components/LoginForm/LoginForm'


const App: React.FC = () => {
  return (
    <ConfigProvider>
      <CustomLayout>
        {
          <Routes>
            <Route path='/' element={<GenericPage FormComponent={LoginForm}/>} />
            <Route path='/login' element={<GenericPage FormComponent={LoginForm}/>} />
            <Route path='/register' element={<GenericPage FormComponent={RegisterForm}/>} />
            <Route path='/producers' element={<ReceiverPage/>} />
            <Route path='/posts/:id/' element={<ReceiverPurchasePage />} />
            <Route path='/orders/:id/' element={<ReceiptCard order={dummyOrder} />} />
            <Route path='/me-producer' element={<ProducerPostsManagementPage/>} />
            <Route path='/me-producer/create' element={<ProducerPostCreationPage/>} />
            <Route path='/me-receiver'/>
            <Route path='/me-receiver/create' />
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
