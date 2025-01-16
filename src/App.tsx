import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store'; // Importa el tipo del estado raíz
import { increment, decrement, incrementByAmount, decrementByAmount } from './features/counter/counterSlice';
import SupabaseExample from './supabase/supabaseExample';

const App: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value); // Define el tipo del estado
  const value : string = useSelector((state: RootState) => state.counter.papa); // Define el tipo del estado
  const dispatch = useDispatch();

  return (
    <div style={{width:'100%', height:'100%'}}>
    <div style={{textAlign:'center'}}>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1 style={{textAlign:'center'}}>Vite + React</h1>

    <div style={{ textAlign: 'center',  }}>
      <h1>Redux Counter (TypeScript) {value} </h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      <button onClick={() => dispatch(decrementByAmount(5))}>Decrement by 5</button>
    </div>
    <p className="read-the-docs">
      Click on the Vite and React logos to learn more
    </p>
    <br/>
    <SupabaseExample/>
  </div>
  );
};

export default App;