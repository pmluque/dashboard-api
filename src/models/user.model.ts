
/** TODO: DevDoc : https://gustavodohara.com/blogangular/clases-en-typescript/ */

export class User {
    username: string = '';
    name: string= '';
    password:string= '';
    token: string= '';
    status: string= '';
    date_created: string= '';
    date_modified: string= '';
    created_by: string= '';
    modified_by: string= '';

    constructor( _username:string , _name:string  , _password:string) {
        this.username = _username;
        this.name = _name;
        this.password = _password;
        this.date_created = new Date().getTime().toString();
        this.created_by = 'api';
    }
}