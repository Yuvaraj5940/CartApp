import {Img_list, Resto_Data, Resto_Menu, Add_item} from './action';

const initialState = {
  listimg: [],
  restodata: [],
  menuList: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case Img_list:
      return {...state, listimg: action.payload};
    case Resto_Data:
      return {...state, restodata: action.payload};
    case Resto_Menu:
      return {...state, menuList: action.payload};
    case Add_item:
      // {
      //   menuList.map(x => x.id === action.payload);
      // }

      return {...state, menuList: action.payload};
    default:
      return state;
  }
}
