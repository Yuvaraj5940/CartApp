import { Img_list, Resto_Data } from "./action";

const initialState = {
  listimg: [],
  restodata: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case Img_list:
      return {...state, listimg: action.payload};
    case Resto_Data:
      return {...state, restodata: action.payload};
    default:
      return state;
  }
}
