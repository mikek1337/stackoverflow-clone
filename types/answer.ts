export type Answer = {
  id:string,
  votes: any[]
  content:any,
  postedDate:string,
  isAi: boolean,
  isAnswer:boolean,
  user:{
    username:string,
    image:string
  }
  
}
