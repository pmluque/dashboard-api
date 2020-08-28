
/** TODO: DevDoc : https://gustavodohara.com/blogangular/clases-en-typescript/ */
/**
 * User
 * Modelo de base de datos
 * 
 * Ciclo de vida (status)
 * -------------                                      |->disabled
 *                                       |-> enabled -|  
 *  (begin) new ->  enabled -> disabled -|            |->retired -> (end)
 *                                       |-> retired -> (end)
 */


export class User {
    id:string ='';
    name: string= '';        
    username: string = '';  
    password:string= '';
    email: string = '';    
    mobile: string = '';          
    token: string= '';
    status: string= '';
    isEmailConfirmed: boolean = false;
    date_created: string= '';
    date_modified: string= '';
    created_by: string= '';
    modified_by: string= '';

    constructor( name:string  , username:string , password:string , email:string) {  
        this.name = name;
        this.email = email;             
        this.username = username;        
        this.password = password;
        this.date_created = new Date().getTime().toString();
        this.created_by = 'api';
        this.status='new';
        this.isEmailConfirmed = false;
    }

}