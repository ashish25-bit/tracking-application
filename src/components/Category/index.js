import { useTodo } from '../../contexts/TodoContext';
import './index.css';
import Todo from '../Todo';
import sleep from '../../utils/sleep';

function Category() {
  const { categories, todos } = useTodo();

  async function toggleCategory(e) {
    const todoContainer = e.target.parentElement?.nextSibling;

    if (!todoContainer)
      return;

    const elem = todoContainer?.childNodes[0];

    if (!elem)
      return;

    e.target.classList.toggle("closed");

    if (e.target.classList.contains('closed')) {
      elem.style.opacity = `0`;
      await sleep(400);

      elem.style.display = 'none';
    }
    else {
      elem.style.display = 'block';
      await sleep(100);

      elem.style.opacity = '1';
      await sleep(400);
    }
  }

  return (
    categories.map((category, index) => {
      return (
        <div key={index} className='category'>
          <div className='header'>
            <h2>{category}</h2>
            { todos[category].length > 0 && <button onClick={toggleCategory}></button> }
          </div>
          <div className='todo-container'>
            <Todo name={category} data={todos[category]} />
          </div>
        </div>
      )
    })
  )
}

export default Category;
