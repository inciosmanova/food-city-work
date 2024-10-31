export interface LoginResult {
    data: any
    message: string
    statusCode: number
    status: boolean
  }
  
  export interface LoginRequest {
    username: string
    password: string
  }
  