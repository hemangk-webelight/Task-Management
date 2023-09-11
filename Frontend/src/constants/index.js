//url
export const BASE_AUTH_URL = "http://localhost:3000/auth"
export const BASE_TASK_URL = "http://localhost:3000/tasks"
export const BASE_CATEGORY_URL = "http://localhost:3000/category"


//API Header
const token = localStorage.getItem("token")
export const HEADER = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }