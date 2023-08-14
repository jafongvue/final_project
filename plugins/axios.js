export default function(context){
  context.$axios.onRequest((config)=>{
    config.baseURL="http://localhost:8003";
  });
  context.$axios.onError((error)=>{
    return false
  })
}
