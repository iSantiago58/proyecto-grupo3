import { atom } from "jotai"

export const loggedInUser = atom({ email: "", alias: "", name: "" })
export const isUserLoggedInAtom = atom(false)
export const deviceId = atom("")
export const userAlias = atom("")