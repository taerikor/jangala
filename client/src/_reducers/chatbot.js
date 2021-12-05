import { SAVE_MESSAGE } from "../_actions/types";

const chatbotReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case SAVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default:
      return state;
  }
};
export default chatbotReducer;
