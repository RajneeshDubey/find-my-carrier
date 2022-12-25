import * as React from "react";
import { useEffect } from "react";
import "./style.scss";
import Header from "./Header";
import Product from "./Product";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "./utils/firebase.config";
import "@seller-center/core-components/dist/index.css";
const App = () => {
  useEffect(()=>{

    //initializeApp(firebaseConfig);

  },[])
  return (
    <>
      {/* <img width="10%" height="10%" src="/Users/s0k05ku/Documents/hackathon/Bg.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF" /> */}
      <Header />
      <Product />
    </>
  );
};

export default App;
