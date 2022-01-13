import './index.css';
import PropTypes from 'prop-types';
import { ReactComponent as MoreLogo } from '../../icons/more.svg';

function TodoItem({ text }) {
  return (
    <div className='todo-item'>
      <div>
        <input type="checkbox" />
      </div>
      <div> {text} </div>
      <div>
        <button>
          <MoreLogo />
        </button>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired
};


export default TodoItem;
