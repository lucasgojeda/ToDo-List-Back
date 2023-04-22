/** Libraries */
import 'dotenv/config'
import chalk from 'chalk'
import { connect, disconnect, set } from 'mongoose'

/** Utils */
import { log } from '../utils/logger'

/** .env - variables */
const DB_URL = process.env.DB_URL as string

export const dbConnect = async (): Promise<void> => {
  try {
    set('strictQuery', false)

    await connect(DB_URL)

    log.info(chalk.cyan('Online database'))
  } catch (error) {
    log.error(
      `${chalk.red.bold(
        'Error connecting to the database'
      )} \n ${chalk.red.bold(error)}`
    )
  }
}

export const dbDisconnect = async (): Promise<void> => {
  try {
    await disconnect()

    // log.info(chalk.cyan('Database disconnected'))
  } catch (error) {
    log.error(
      `${chalk.red.bold(
        'Error disconnecting to the database'
      )} \n ${chalk.red.bold(error)}`
    )
  }
}
