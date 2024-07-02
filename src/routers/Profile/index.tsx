import style from './style.module.scss'
import api from "../../api/api"
import { FormEvent, useEffect, useState } from "react"
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
    const navigate = useNavigate();

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
            navigate(`/profile/${id}`);
        } catch (error) {
            console.log(error)
        }
    }

    if(!user) return <div>Carregando...</div>

    return <>
        <div className={style.container}>
            <div className={style.div1}></div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(ev) => setName(ev.target.value)}/>
                    <input type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled/>
                    <button type='submit'>salvar</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    </>
}