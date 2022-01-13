import { useTodo } from '../../contexts/TodoContext';
import './index.css';
import Todo from '../Todo';

function Category() {
  const { categories, todos } = useTodo();

  return (
    categories.map((category, index) => {
      return (
        <div key={index} className='category'>
          <h2>{category}</h2>
          <Todo name={category} data={todos[category]} />
        </div>
      )
    })
  )
}

export default Category;
