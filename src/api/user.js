import axios from 'axios'

const API_URL = 'http://localhost:4001'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
export default axiosInstance

//* logowanie użytkownika
export async function login({ email, password, rememberMe }) {
  if (rememberMe) console.log('pamietaj mnie zaznaczone')
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    if (rememberMe) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('name', response.data.user.firstName)
    } else {
      sessionStorage.setItem('accessToken', response.data.accessToken)
      sessionStorage.setItem('name', response.data.user.firstName)
    }

    console.log(response) //* tu wyświetlam sobie cały obiekt
    return response.data

    //* nie mogę tutaj zapisać danych do local storage, bo muszę podjąć decyzję czy zapisać do localStorage, czy do sessionStorage
    //* muszę także zapisać sobie w local storage info że użytkownik zaznaczył pamiętaj mnie
  } catch (error) {
    console.log('błąd logownia:', error)
  }
}

//*wylogowanie użytkownika
export function logOut() {
  localStorage.removeItem('accessToken') || sessionStorage.removeItem('accessToken')
  localStorage.removeItem('name') || sessionStorage.removeItem('name')

  console.log('wylogowano usunięto token i imię użytkownika')
}
//*pobranie tokena
export function getAuthToken() {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
}

//*dodanie nowego użytkownika
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data)
    console.log("✅ Rejestracja zakończona sukcesem:", response.data)
  } catch (error) {
    console.error("❌ Błąd podczas rejestracji:", error.response?.data || error)
  }
}
