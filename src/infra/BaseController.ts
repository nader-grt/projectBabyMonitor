import { Request, Response } from "express";

export default abstract class BaseController {

  protected abstract executeImplment(
    req: Request,
    res: Response
  ): Promise<any>;

  public async execute(req: Request, res: Response): Promise<any> {
    try {
      await this.executeImplment(req, res);
    } catch (error: any) {
      console.error("Unexpected error:", error);

      return this.internalError(res, error.message);
    }
  }

  // -------------------------
  // SUCCESS
  // -------------------------
  protected ok(res: Response, data?: any, message = "OK") {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  protected created(res: Response, data?: any, message = "Created") {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  // -------------------------
  // FAIL (CLIENT ERRORS)
  // -------------------------
  protected fail(res: Response, message = "Bad Request", errors?: any) {
    return res.status(400).json({
      success: false,
      message,
      errors,
    });
  }

  protected unauthorized(res: Response, message = "Unauthorized") {
    return res.status(401).json({
      success: false,
      message,
    });
  }

  protected forbidden(res: Response, message = "Forbidden") {
    return res.status(403).json({
      success: false,
      message,
    });
  }

  protected notFound(res: Response, message = "Not Found") {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  // -------------------------
  // SERVER ERROR
  // -------------------------
  protected internalError(
    res: Response,
    message = "Internal Server Error"
  ) {
    return res.status(500).json({
      success: false,
      message,
    });
  }
}