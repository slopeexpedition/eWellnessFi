import './App.css';
import EmployerView from './EmployerView';
import EmployeeView from './EmployeeView';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <label style={{ fontSize: 25,color:"orange" }}>
          <b> eWellnessFi</b>
        </label>
        <label style={{ fontSize: 20 }}>
          <i>(Powered by Solana)</i>
        </label>
        


          <label style={{ fontSize: 15}}>
            Ensure mental and physical wellbeing of Employees!
          </label>
          <hr></hr>
        
        {/* <EmployerView /> */}
        <EmployeeView />

      </header>
    </div>
  );
}

export default App;
