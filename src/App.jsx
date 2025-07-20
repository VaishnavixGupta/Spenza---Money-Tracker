import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Expenses from './pages/Expenses';
import BudgetManager from './components/Dashboard/BudgetManager';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Categories from './pages/Categories';
import Reports from './pages/Reports';

function App() {
  return (
    <AppProvider>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-expense" element={<AddExpense />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/budgets" element={<BudgetManager />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </AppProvider>
  );
}

export default App;

