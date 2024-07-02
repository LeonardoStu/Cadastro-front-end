import { useState } from "react"
import api from "../../api/api"
import style from './style.module.scss'


export default function RegisterUser(){
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post('/register', {
                name,
                lastName,
                email,
                password
            })

            setMessage(response.data.msg);
            console.log(message);

            setName('');
            setLastName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error)
        }


    }

    return <>
        <form onSubmit={handleSubmit} className={style.form}>

            <div className={style.title}>
                <h1>Digite seus dados</h1>
            </div>

            <div className={style.divForm}>
                <div className={style.divInput}>
                    {/* firstname */}
                    <label className={style.label} htmlFor="name">Nome</label>
                    <input className={style.input} type="text" id="name" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>

                <div className={style.divInput}>
                    {/* lastname */}
                    <label className={style.label} htmlFor="lastname">Sobrenome</label>
                    <input className={style.input} type="text" id="lastname" placeholder="digite seu sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>

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

            </div>

            <div>
                <button type="submit" className={style.btn}>Enviar</button>
            </div>
        </form>
    </>
}