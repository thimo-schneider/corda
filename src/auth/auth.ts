// import { Issuer } from "openid-client";
import fs from "node:fs/promises";
import f from "lodash/fp";
import fetch from "node-fetch";
import config from "../config"
const usersJsonPath = "../data/users.json"

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0"

const asyncInterval = async (callback: any, intervalTime: any, timeout: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime()
    const interval = setInterval(async () => {
      const answer = await callback()
      if (!answer.error) {
        clearInterval(interval);
        resolve(answer);
      } else if (process.hrtime(startTime) >= timeout || f.contains(answer.error, ["authorization_declined", "bad_verification_code", "expired_token"])) {
        clearInterval(interval);
        console.error(`Login failed, reason: ${answer.error}`)
        reject(answer);
      }
    }, intervalTime);
  });
}

function pollUserLogin(deviceAuthorizationResult: any): Promise<void> {
  const { interval, expires_in, device_code } = deviceAuthorizationResult
  const pollReq = () => {
    const body = {
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      tenant: config.tenant_id,
      client_id: config.client_id,
      device_code
    }
    return fetch(`https://login.microsoftonline.com/${config.tenant_id}/oauth2/v2.0/token`, {
      method: "post",
      body: new URLSearchParams(body).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => res.json())
  }

  return asyncInterval(pollReq, interval * 1000, expires_in * 1000)
}

function displayMessageToUser(deviceAuthPromise: Promise<any>): Promise<any> {
  return deviceAuthPromise.then(res => {
    const { message } = res;
    console.log(message)
    return res
  })
}

function requestDeviceAuthorization(): Promise<any> {

  const body = {
    client_id: config.client_id,
    scope: "openid offline_access",
  }

  return fetch(`https://login.microsoftonline.com/${config.tenant_id}/oauth2/v2.0/devicecode`, {
    method: "post",
    body: new URLSearchParams(body).toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then(res => res.json())
}

// function tokenRefresh(refreshToken: String): Promise<object> {

// }

export default async function login(userName: string): Promise<string> {
  console.log("login")
  const usersJson = await getUsers()
  const isUserAlreadyLoggedIn = f.compose(
    f.contains(userName),
    f.keys
  )(usersJson)
  if (isUserAlreadyLoggedIn) {
    const userAccessInformation = usersJson[userName.toString()]
    const isAccessTokenExpired = Math.floor((Date.now() - userAccessInformation.creation_time) / 1000) > userAccessInformation.expires_in
    if (isAccessTokenExpired) {

    } else {
      return Promise.resolve(userAccessInformation.access_token)
    }
  } else {
    const res = await displayMessageToUser(requestDeviceAuthorization())
    console.log(res)
    const loginRes = await pollUserLogin(res)
    console.log(loginRes)
  }
}

async function addUserLogin(userName: String, login: object): Promise<void> {
  const usersJson = await getUsers()
  const updatedUsersJson = { ...usersJson, [userName.toString()]: login }
  return writeUsers(updatedUsersJson)
}

function writeUsers(users: object): Promise<void> {
  return fs.writeFile(usersJsonPath, JSON.stringify(users))
}

function getUsers(): Promise<any> {
  return fs.readFile(usersJsonPath, { encoding: 'utf8' }).then((buf) => JSON.parse(buf)).catch((err) => console.log(err))
}
// login("test")
