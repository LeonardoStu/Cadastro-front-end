import api from '../../api/api'
import style from './style.module.scss'
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/login', { email, password })

            const token = response.data.token
            sessionStorage.setItem('token', token)

            const userId = response.data.user.id

            navigate(`/profile/${userId}`)
        } catch (error: any) {
            setMessage(error.response.data.msg)
        }
    }

    return<>
        <div className={style.container}>
            <div className={style.arrow}>
                <Link to='/register'>
                    <FaArrowLeft style={{height:'30px', width:'30px', color:'#424242'}} />
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

                    <div style={{color:'white', margin:'10px', height:'20px'}}>
                        {message && <p> {message} </p>}
                    </div>

                <div>
                    <button type='submit' className={style.btn}>Entrar</button>
                </div>
            </form>
        </div>
    </>
}