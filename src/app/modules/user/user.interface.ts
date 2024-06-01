export type TUser ={
    id:string;
    password:string;
    needsPasswordChange: boolean;
    role:'student'|'admin'|'faculty';
    status:'in-progress'|'blocked';
    isDeleted:boolean;
    
}
