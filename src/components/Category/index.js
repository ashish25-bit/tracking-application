import { useTodo } from '../../contexts/TodoContext';
import './index.css';
import Todo from '../Todo';
import sleep from '../../utils/sleep';

function Category() {
  const { categories, todos } = useTodo();

  async function toggleCategory(e) {
    const siblingElement = e.target.parentElement?.nextSibling;

    if (!siblingElement)
      return;

    const elem = siblingElement?.childNodes[0];

    if (!elem)
      return;

    e.target.classList.toggle("closed");

    if (e.target.classList.contains('closed')) {
      siblingElement.style.overflow = 'hidden';
      elem.style.transform = `translateY(-${elem.offsetHeight + 10}px)`;
      await sleep(400);
      elem.style.display = 'none';
    }
    else {
      elem.style.display = 'block';
      await sleep(100);
      elem.style.transform = 'translateY(0)';
      siblingElement.style.removeProperty('overflow');
    }
  }

  return (
    categories.map((category, index) => {
      return (
        <div key={index} className='category'>
          <div className='header'>
            <h2>{category}</h2>
            { todos[category].length > 0 && <div role='button' onClick={toggleCategory}></div> }
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
