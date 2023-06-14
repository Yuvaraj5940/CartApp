export const Img_list = 'Img_List';
export const Resto_Data = 'Resto_Data';

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
