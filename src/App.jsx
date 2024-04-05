import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import Dashboard from '../components/Dashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div style={{ backgroundColor: 'blueviolet' }}>hello world</div> */}
      <div
        style={{
          width: '135%',
          // backgroundColor: 'yellow',
          // position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'scroll',
        }}
      >
        <Dashboard />
      </div>
    </>
  );
}

export default App;
