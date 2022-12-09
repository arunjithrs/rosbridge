 import './App.css';
import Connection from './comopnents/Connection';
import Footer from './comopnents/Footer';
import Header from './comopnents/Header';
import Teleoperation from './comopnents/Teleoperation';


function App() {
  return (
    <div className="App">
      <Header></Header> 
      <Connection></Connection>
      <div className='page-wrapper'> 
        <div className='page-right-wrapper'>asd</div> 
        <div className='page-left-wrapper'> 
          <Teleoperation></Teleoperation>
        </div> 
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
