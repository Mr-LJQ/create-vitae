import { defineStore } from "pinia";

export interface State {
  name:string,
  birth:string,
  phone:string,
  email:string,
  picture:string,
  yearsOfWorking:string,
  gender:string,
  maritalStatus:string,
  height:string,
  weight:string,
  nation:string,
  nativePlace:string,
  politicsStatus:string,
  convertToAge:boolean,
  showPhoto:boolean
}

export const useBasicInfoStore = defineStore("BasicInfo", {
  state:():State => {
    return {
      name:"",
      birth:"",
      phone:"",
      email:"",
      picture:"",
      yearsOfWorking:"",
      gender:"",
      maritalStatus:"",
      height:"",
      weight:"",
      nation:"",
      nativePlace:"",
      politicsStatus:"",
      convertToAge:false,
      showPhoto:false,
    }
  },
});
