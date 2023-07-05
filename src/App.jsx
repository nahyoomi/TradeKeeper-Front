import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './redux/global/globalSlider';

 const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

import './App.scss'
import MainRoutes from './routes/MainRoutes'

function App() {
  return (
    <>
    <Provider store={store}>
      <MainRoutes/>
    </Provider>
    </>
  )
}

export default App
