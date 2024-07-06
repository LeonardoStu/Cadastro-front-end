import { useState } from "react"
import api from '../../api/api'
import { Link, useNavigate } from "react-router-dom"
import style from './style.module.scss'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/login', { email, password })

            const token = response.data.token
            sessionStorage.setItem('token', token)

            const userId = response.data.user.id

            navigate(`/profile/${userId}`)
            console.log('Login bem sucedido')
        } catch (error) {
            console.log(error)
        }
    }

    return<>
        <div className={style.container}>
            <div className={style.arrow}>
                <Link to='/register'>
                    <img src="/seta_esquerda.png" alt="arrow_left" className={style.arrow_left}/>
                </Link>
            </div>
            <form onSubmit={handleLogin} className={style.form}>

                <h1 className={style.title}>Digite seus dados</h1>

                <div className={style.divInput}>
                    {/* email */}
                    <label className={style.label} htmlFor="email">Email</label>
                    <input className={style.input} type="email" id="email" placeholder="digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div className={style.divInput}>
                    {/* password */}
                    <label className={style.label} htmlFor="password">Senha</label>
                    <input className={style.input} type="password" id="password" placeholder="digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                <div>
                    <button className={style.btn}>Entrar</button>
                </div>
            </form>
        </div>
    </>
}