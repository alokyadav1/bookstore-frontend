/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

const timeout = 1000 * 30  // 30 seconds
const promptBeforeIdle = 1000 * 10 // 10 seconds
function SessionAlertModal() {
    const [state, setState] = useState('Active')
    const [remaining, setRemaining] = useState(timeout)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onIdle = () => {
        setState('Idle')
        setOpen(false)
        const userRole = localStorage.getItem('userRole')
        localStorage.clear()
        if (userRole === 'ADMIN') {
            window.location.href = '/admin/login'
        } else {
           window.location.href = '/user/login'
        }
    }

    const onActive = () => {
        setState('Active')
        setOpen(false)
    }

    const onPrompt = () => {
        setState('Prompted')
        setOpen(true)
    }

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout,
        promptBeforeIdle,
        throttle: 500
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })

    const handleStillHere = async() => {
        setLoading(true)
        const userRole = localStorage.getItem('userRole')
        let token = null
        let admin = null
        let user = null
        if (userRole === 'ADMIN') {
            admin = JSON.parse(localStorage.getItem('admin'))
            token = admin?.token
        } else {
            user = JSON.parse(localStorage.getItem('currentUser'))
            token = user?.token
        }
        const res = await axios.post(`http://localhost:8080/auth/refresh-token?token=${token}`)
        if (res.status === 200) {
            if (userRole === 'ADMIN') {
                const adminData = { ...admin, token: res.data }
                localStorage.setItem('admin', JSON.stringify(adminData))
            } else {
                const userData = { ...user, token: res.data }
                localStorage.setItem('currentUser', JSON.stringify(userData))
            }
        }
        setLoading(false)
        activate()
    }

    const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0)
    const seconds = timeTillPrompt > 1 ? 'seconds' : 'second'

    return (
        <div className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 py-5`}>
            <div className="relative bg-white p-4 rounded shadow-lg h-fit overflow-y-auto overflow-x-hidden no-scrollbar">
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='text-2xl font-bold'>Session is about to expire</h1>
                    <button className='bg-red-500 text-white rounded p-2' onClick={handleStillHere} disabled={loading}>I'm still here</button>
                    <p className='text-sm text-gray-500'>You will be logged out in {remaining} {seconds}</p>
                </div>
            </div>
        </div>
    )
}

export default SessionAlertModal