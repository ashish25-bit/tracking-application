import Category from './components/Category';
import Header from './components/Header';
import HeaderActionButtons from './components/HeaderActionButtons';

function App() {

  return (
    <div className='main-container'>
      <Header />
      <HeaderActionButtons />
      <Category />
    </div>
  );
}

export default App;
