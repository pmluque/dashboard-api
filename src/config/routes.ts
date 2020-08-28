import { Application , Request, Response } from "express";
import { IndexController } from "../controllers/index.controller";
import { UserController } from "../controllers/user.controller";
// Middleware
import { insertValidator } from '../middleware/validator';

// Ref. http://rsseau.fr/en/programming/2019/06/19/express-typescript.html


export class Routes {
  public indexController:IndexController = new IndexController();    
  public userController: UserController = new UserController();

  public routes( app: Application ): void {

    app.route("/")
        .get(this.indexController.index)
        ;
        
    app.route("/api/users")
        .get(this.userController.findAll)
        .post([insertValidator], this.userController.insert) 
        ;         

    app.route("/api/users/:username")
        .get(this.userController.findOne)
        .delete(this.userController.delete)        
        ;

  }
}