import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { incrementByAmount } from './counterSlice';

test('initial state', () => {
    const store = configureStore({ reducer: { counter: counterReducer } });
    console.log(store.getState())
    const state = store.getState().counter;
    expect(state.value).toBe(0);
});

test('increment action', () => {
    const store = configureStore({ reducer: { counter: counterReducer } });
    store.dispatch({ type: 'counter/increment' });
    const state = store.getState().counter;
    expect(state.value).toBe(1);
});

test('decrement action', () => {
    const store = configureStore({ reducer: { counter: counterReducer } });
    store.dispatch({ type: 'counter/decrement' });
    const state = store.getState().counter;
    expect(state.value).toBe(-10);
});

test('incrementByAmount action', () => {
    const store = configureStore({ reducer: { counter: counterReducer } });
    store.dispatch(incrementByAmount(5));
    const state = store.getState().counter;
    expect(state.value).toBe(5);
});