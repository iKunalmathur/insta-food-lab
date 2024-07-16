export default function formData<GenericType>(data: GenericType) {
  /*  
      create new FormData obj
      add each key:value to formData
      before adding check for type and convert value accordingly
      if value type is image add as image
    */

  const formData = new FormData();
  for (const key in data) {
    if (data[key] instanceof FileList) {
      for (let i = 0; i < data[key].length; i++) {
        formData.append(`${key}[]`, data[key][i]);
      }
    } else {
      formData.append(key, data[key] as string);
    }
  }
  return formData as GenericType;
}
