export interface AuthRes {
  access_token: string
  user: {
    id: string
    userName: string
    email: string
    phoneNumber: string
    dob: string
    firstName: string
    lastName: string
  }
}
export interface SignUpBody {
  userName: string
  phoneNumber: string
  email: string
  dob: string
  password: string
  firstName: string
  lastName: string
}
