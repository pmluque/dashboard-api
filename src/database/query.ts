import config from "../config";

export const sql = {
  'user.findAll': 
       `select id,name,username,password,email,status,isEmailConfirmed,created_by, date_created, modified_by, date_modified 
          from ${config.DB_USER}.sc_users`  ,
  'user.findOneByEmail': 
        `select id,name,username,password,email, status,isEmailConfirmed,created_by, date_created, modified_by, date_modified 
             from ${config.DB_USER}.sc_users where email=$1 limit 1`  ,   
  'user.insert': 
        `insert into ${config.DB_USER}.sc_users(name, username, password, email) 
                 values ($1,$2,$3,$4)`  , 
  'user.delete': 
        `delete from ${config.DB_USER}.sc_users where email=$1`,                                       
}  