import { useState } from 'react';
import './index.css';
import {ReactComponent as ArrangeBtn} from '../../icons/arrange-category.svg';

function HeaderActionButtons() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  function addNewTodo() {
    console.log('adding new todo')
  }

  function editCategory() {
    console.log('edit category')
    setEditModalOpen(prevState => { return !prevState });
  }

  return (
    <div className='header-button-container'>
      <button onClick={addNewTodo} title='CTRL + enter'>New todo</button>

      <button onClick={editCategory} title='add, delete, rearrange categories'>
        <ArrangeBtn />
      </button>

      { isEditModalOpen && <div>Edit categories modal</div> }

    </div>
  )
}

export default HeaderActionButtons;
