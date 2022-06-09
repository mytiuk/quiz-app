import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavigatePage() {
   const navigate = useNavigate()
   navigate('/')
}
