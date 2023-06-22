export const Img_list = 'Img_List';
export const Resto_Data = 'Resto_Data';
export const Resto_Menu = 'Resto_Menu';
export const Add_item = 'Add_item';

export const SetImagelist = Imagelist => {
  return {
    type: Img_list,
    payload: Imagelist,
  };
};

export const RestoData = Restodata => {
  return {
    type: Resto_Data,
    payload: Restodata,
  };
};
export const LoadMenu = menuList => {
  return {
    type: Resto_Menu,
    payload: menuList,
  };
};
export const AddLoadMenu = menuList => {
  return {
    type: Add_item,
    payload: menuList,
  };
};
