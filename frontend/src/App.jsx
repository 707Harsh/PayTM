// import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
// import { SendMoney } from "./pages/SendMoney";
import { SignUp } from "./pages/SignUp"
import { Signin } from "./pages/Signin"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {RecoilRoot} from 'recoil'

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/Home/*" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
