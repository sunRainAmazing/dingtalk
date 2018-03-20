import fs from 'fs'
import path from 'path'
import { app } from 'electron'

/**
 * 初始化设置选项
 */
export const initSetting = dingtalk => () => {
  const filename = path.join(app.getPath('userData'), 'setting.json')
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.constants.R_OK | fs.constants.W_OK, async err => {
      if (err) {
        if (err.code === 'ENOENT') {
          return resolve(await dingtalk.writeSetting())
        } else {
          return reject(err)
        }
      }
      resolve(await dingtalk.readSetting())
    })
  })
}

/**
 * 从文件中读取设置信息
 */
export const readSetting = dingtalk => () => {
  const filename = path.join(app.getPath('userData'), 'setting.json')
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) return reject(err)
      try {
        return resolve({ ...dingtalk.setting, ...JSON.parse(data) })
      } catch (e) {
        resolve(dingtalk.setting)
      }
    })
  })
}

/**
 * 写入设置到文件
 */
export const writeSetting = dingtalk => () => {
  const filename = path.join(app.getPath('userData'), 'setting.json')
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(dingtalk.setting, null, 2), err => {
      if (err) return reject(err)
      resolve(dingtalk.setting)
    })
  })
}