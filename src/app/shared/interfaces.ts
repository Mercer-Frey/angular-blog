export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}
export interface FBAuthResponse {
  idToken: string
  expiresIn?: string
  kind?: string
  localId?: string
  email?: string
  displayName?: string
  registered?: boolean
}
export interface Post {
  id?: string
  title: string
  author: string
  text: string
  date?: Date
}
export interface FBCreateResponse {
  name: string
}
