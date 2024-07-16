import style from './style.module.scss'
import api from "../../api/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface User {
    _id: string,
    name: string,
    lastName: string,
    email: string,
    password: string
}

export default function Profile(){
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fatchUser = async() => {
            try {
                const response = await api.get(`/profile/${id}`)
                const userData = response.data
                setUser(userData)
                setName(userData.name)
                setLastName(userData.lastName)
                setEmail(userData.email)
                setPassword(userData.password)
            } catch (error) {
                console.log(error)
            }
        }

        fatchUser()
    }, [id])

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()

        try {
            console.log("Updating user with id:", id);
            const response = await api.put(`/profile/${id}`, {
                name,
                lastName,
                email,
                password
            })
            
            setMessage(response.data.msg);
            setUser(response.data.updatedUser)

            setTimeout(() => {
                setMessage(null);
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }

    const UserDelete = async() => {
        await api.delete(`/profile/${id}`)
        sessionStorage.clear()
        navigate('/register')
    }

    if(!user) return <div>Carregando...</div>

    return <>
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.divInput}>
                    {/* firstname */}
                    <label className={style.label} htmlFor="name">Nome:</label>
                    <input className={style.input} type="text" id="name" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>

                <div className={style.divInput}>
                    {/* lastname */}
                    <label className={style.label} htmlFor="lastname">Sobrenome:</label>
                    <input className={style.input} type="text" id="lastname" placeholder="digite seu sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>

                <div style={{height:'20px', color:'white'}}>
                    {message && <p>{message}</p>}
                </div>

                <div className={style.divBtn}>
                    <button className={style.btn}>Editar</button>
                    <button className={style.btn} onClick={UserDelete} type='button'>Excluir</button>
                </div>
            </form>
        </div>
    </>
}