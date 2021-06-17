import { useAuthContext } from '../hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      {user.toString()}
    </div>
  );
}

export default App;
