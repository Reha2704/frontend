import { FETCH_ALL, CREATE } from '../actions/ActionTypes';

export default (posts = [], action) => {
        switch (action.type) {

          case FETCH_ALL:
            return action.payload;
          case CREATE:
            return [...posts, action.payload];
          
          default:
            return posts;
        }
      };
      