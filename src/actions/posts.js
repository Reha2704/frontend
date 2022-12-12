import * as api from '../api';

//Action creators
export const getPosts =()=>async(dispatch)=>{
    try {
        const {data}= await api.fetchPosts();
         dispatch({type:'FETCH_ALL',payload:data});
    } catch (error) {
        console.log(error.message)
    }
   
}
//new post
export const createPost = (post) => async (dispatch) => {
  console.log("hello",post)
    try {
      const { data } = await api.createPost(post);
      console.log("frontend data",data)
      dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
      console.log("error hello")
      console.log(error);
    }
};
// update post
export const updatePost =(id,post)=>async(dispatch)=>{
  try {
    const {data}=await api.updatePost(id,post);
    dispatch({type:'UPDATE',payload:data});

  } catch (error) {
    console.log(error);
  }
}