import { CreateUserService } from "@services/user/CreateUserService";
import { DeleteUserService } from "@services/user/DeleteUserService";
import { FindUserService } from "@services/user/FindUserService";
import { ListUserService } from "@services/user/ListUserService";
import { UpdateUserService } from "@services/user/UpdateUserService";
import { Request, Response } from "express";

export class UserController {
  public async index(_req: Request, res: Response): Promise<Response> {
    return res.json({
      success: true,
      users: await new ListUserService().execute(),
    });
  }

  async create(req: Request, res: Response): Promise<Response> {
    return res.json({
      success: true,
      user: await new CreateUserService().execute(req.body),
    });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    return res.json({
      success: true,
      user: await new FindUserService().execute(req.params.id),
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({
      success: true,
      user: await new UpdateUserService().execute({
        id: req.params.id,
        ...req.body,
      }),
    });
  }

  public async delete(_req: Request, res: Response): Promise<Response> {
    return res.json({
      success: true,
      message: "User has deleted with successfully",
    });
  }
}
