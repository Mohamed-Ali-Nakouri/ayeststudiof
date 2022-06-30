
import actions from './actions';
import { getItem } from '../../utility/localStorageControl';

const {
  NEXT_STEP
} = actions;

const initState = {
  nextStep:0,
};

const EventsReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case NEXT_STEP:
      return {
        ...state,
        nextStep: data,
      };

    default:
      return state;
  }
};
export default EventsReducer;
