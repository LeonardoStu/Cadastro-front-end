import { useState } from "react"
import api from "../../api/api"
import { useNavigate } from "react-router-dom"


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/login', { email, password })

            const token = sessionStorage.setItem('token', response.data.token)
            const userId = response.data.user.id

            navigate(`/profile/${userId}`)

            console.log('Login bem sucedido')

        } catch (error) {
            console.log(error)
        }
    }

    return<>
        <form onSubmit={handleLogin}>
            <input type="email" id="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" id="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Entrar</button>
            {error && <p>{error}</p>}
        </form>
    </>
}