import { Application , Request, Response } from "express";
import { IndexController } from "../controllers/index.controller";
import { UserController } from "../controllers/user.controller";
// Ref. http://rsseau.fr/en/programming/2019/06/19/express-typescript.html
export class Routes {
  public indexController:IndexController = new IndexController();    
  public userController: UserController = new UserController();

  public routes( app: Application ): void {

    app.route("/").get(this.indexController.index);
    app.route("/findOne").get(this.userController.findOne);
  }
}