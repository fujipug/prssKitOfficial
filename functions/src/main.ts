import { initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

initializeApp();

const serverAuth = getAuth();

const cors = [
  "http://localhost:3000",
  "https://prsskit.com",
  "https://www.prsskit.com"
]

export { cors, serverAuth }