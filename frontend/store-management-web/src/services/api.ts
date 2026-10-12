import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
})

const TOKEN_KEY = 'bamba_aqua_token'
const OPERATOR_KEY = 'bamba_aqua_operator'

/**
 * INTERCEPTOR DE REQUISIÇÃO:
 * Antes de qualquer requisição sair do navegador para o backend,
 * este interceptor verifica se há um token JWT salvo no localStorage.
 * Se houver, adiciona automaticamente o cabeçalho:
 * Authorization: Bearer <token>
 * Assim você não precisa adicionar o cabeçalho manualmente em cada chamada da API!
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * INTERCEPTOR DE RESPOSTA:
 * Quando o backend responde com status 401 (Unauthorized), significa que:
 * 1) O token expirou após o tempo limite (ex: 12 horas);
 * 2) O token é inválido ou foi adulterado;
 * 3) O operador foi desativado no banco de dados.
 *
 * Nesse caso, limpamos a sessão local e avisamos a aplicação para redirecionar ao /login.
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRequest = error.config?.url?.includes('/auth/login')

        if (error.response?.status === 401 && !isAuthRequest) {
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(OPERATOR_KEY)

            // Dispara evento para o AuthContext e componentes React reagirem
            window.dispatchEvent(new CustomEvent('auth:unauthorized', {
                detail: {message: error.response?.data?.error || 'Sua sessão expirou. Faça login novamente.'}
            }))

            // Se o usuário não estiver na tela de login, redireciona
            if (window.location.pathname !== '/login') {
                window.location.href = '/login?expired=1'
            }
        }

        return Promise.reject(error)
    }
)