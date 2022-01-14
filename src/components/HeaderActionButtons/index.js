import { useState } from 'react';
import './index.css';
import {ReactComponent as ArrangeBtn} from '../../icons/arrange-category.svg';
import AddNewTodo from '../Modal/AddNewTodo';
import { Fragment } from 'react/cjs/react.production.min';

function HeaderActionButtons() {
  const [isModalOpen, setIsModalOpen] = useState(null);

  function addNewTodo() {
    document.body.style.overflowY = 'hidden';
    setIsModalOpen(1);
  }

  function editCategory() {
    console.log('edit category')
    setIsModalOpen(prevState => { return !prevState });
  }

  return (
    <Fragment>
      <div className='header-button-container'>
        <button onClick={addNewTodo} title='CTRL + enter'>New todo</button>

        <button onClick={editCategory} title='add, delete, rearrange categories'>
          <ArrangeBtn />
        </button>
      </div>

      { isModalOpen === 1 && <AddNewTodo setIsModalOpen={setIsModalOpen} /> }
      { isModalOpen === 2 && <div>Edit categories modal</div> }
    </Fragment>
  )
}

export default HeaderActionButtons;
