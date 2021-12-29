import './App.css';
import CustomerList from './features/customer/CustomerList';
import {store} from './store';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <CustomerList/>
      </div>
    </Provider>
  );
}

export default App;
