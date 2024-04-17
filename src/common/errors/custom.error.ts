export class CustomError extends Error {
  public status_code: number;
  public status: string;

  constructor(status_code: number, message: any) {
    super();
    this.status_code = status_code;
    this.status = "error";
    this.message = message;
  }
}
