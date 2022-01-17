import { useState } from 'react';
import './index.css';
import {ReactComponent as ArrangeBtn} from '../../icons/arrange-category.svg';
import AddNewTodo from '../Modal/AddNewTodo';
import { Fragment } from 'react/cjs/react.production.min';
import EditCategoryModal from '../Modal/EditCategoryModal';

function HeaderActionButtons() {
  const [isModalOpen, setIsModalOpen] = useState(0);

  function addNewTodo() {
    document.body.style.overflowY = 'hidden';
    setIsModalOpen(1);
  }

  function editCategory() {
    document.body.style.overflowY = 'hidden';
    setIsModalOpen(2);
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
      { isModalOpen === 2 && <EditCategoryModal setIsModalOpen={setIsModalOpen} /> }
    </Fragment>
  )
}

export default HeaderActionButtons;
