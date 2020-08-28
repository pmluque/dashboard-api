import config from "../config";

export const sql = {
  'user.findAll': 
       `select username,name,password,status,created_by, date_created, modified_by, date_modified 
          from ${config.DB_USER}.sc_users`  ,
  'user.findOne': 
        `select username,name,password,status,created_by, date_created, modified_by, date_modified 
             from ${config.DB_USER}.sc_users where username=$1`  ,   
  'user.insert': 
        `insert into ${config.DB_USER}.sc_users(name, username, password) 
                 values ($1,$2,$3)`  , 
  'user.delete': 
        `delete from ${config.DB_USER}.sc_users where username=$1`,                                       
}  