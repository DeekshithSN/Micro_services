import { BrowserRouter,Routes,Route,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBooking from './bookings/CreateBooking';
import { useMetrics } from '@cabify/prom-react';

function App() {
  const { observe } = useMetrics();
  observe('user_visits', { custom_tag: 'user_visits' }, 1);
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/health" element={<h1> The App is Healthy </h1>} />
        <Route path='/' element={<CreateBooking/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
