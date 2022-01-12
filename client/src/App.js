import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './comps/Login'
import Register from './comps/Register'
import Reports from './comps/Reports'
import Vacations from './comps/Vacations'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <img className="backgrondImg" src="https://www.ofakim.co.il/clients/ofakim2017/gallery/ofakim/header_pics_big/beach-big1.jpg"/>
      <header/>
      <Route path="/" exact component={Login}/>
      <Route path="/register" component={Register} />
      <Route path="/vacations" component={Vacations}/>
      <Route path="/reports" component={Reports}/>
      </BrowserRouter>
    </div>
  )
}
