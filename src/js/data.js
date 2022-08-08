
import { doApiPost, apiUrl } from "../services/apiService";



export const delAppointment = async (arr, allData) => {
           let url = apiUrl+'appointments/del';
           let userData  = {arr, allData};
           let data = doApiPost(url, { userData });
           return data;

 
}
export const editAppointment = async (arr, allData) => {
    let url = apiUrl+'appointments/edit';
    let userData  = {arr, allData};
   let data = doApiPost(url, { userData });
   return data;


}

export const addAppointment = async (arr, allData) => {
    let url = apiUrl+'appointments/add';
    let userData  = {arr, allData};
   let data = doApiPost(url, { userData });
   return data;


}

export const addNewAppointment = async (arr) => {
    let url = apiUrl+'appointments/addnew';
   let data = doApiPost(url, arr);
   return data;


}
export const addNewDiaryUser = async (arr) => {
    let url = apiUrl+'diary/addnew';
   let data = doApiPost(url, arr);
   return data;


}
export const addDiary = async (arr, allData) => {
    let url = apiUrl+'diary/add';
    let userData  = {arr, allData};
   let data = doApiPost(url, { userData });
   return data;
}

export const editRotateDiary = async (arr, allData) => {
    let url = apiUrl+'diary/editRotate';
    let userData  = {arr, allData};
   let data = doApiPost(url, { userData });
   return data;
}
export const delDiaryPage = async (arr, allData) => {
    let url = apiUrl+'diary/del';
    let userData  = {arr, allData};
    let data = doApiPost(url, { userData });
    return data;


}

export const addNewTodolist = async (arr) => {
    let url = apiUrl+'todolist/addnew';
   let data = doApiPost(url, arr);
   return data;
}

export const addRemoveUpdateTodolist = async (arr, user_id) => {
    let url = apiUrl+'todolist/add';
    let userData  = {arr, user_id };
   let data = doApiPost(url, { userData });
   return data;
}



//פונקציה שבודקת את התוכן של הטוקן
export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


          
  export function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }



