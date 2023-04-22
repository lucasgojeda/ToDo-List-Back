/** Libraries */
import { type Response } from 'express'

export const handleError = (
  res: Response,
  msg: string,
  errorRaw: any,
  status: number = 400
): void => {
  console.log(errorRaw)
  res.status(status).json({
    errors: [{ msg }],
  })
}
