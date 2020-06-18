import Sequelize from 'sequelize'

import { sequelize } from '../../util/sequelize'
import { IdType } from '../../../types/server/models'

export interface ClicksType extends IdType, Sequelize.Model {
  readonly shortUrl: string
  readonly epochHours: number
  readonly clicks: number
  readonly createdAt: string
  readonly updatedAt: string
}

type ClicksTypeStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): ClicksType
}

export const Clicks = <ClicksTypeStatic>sequelize.define('click_stats', {
  shortUrl: {
    type: Sequelize.STRING,
    primaryKey: true,
    validate: {
      is: /^[a-z0-9-]+$/,
    },
  },
  epochHours: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  clicks: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})