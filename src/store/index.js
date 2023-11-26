import { defineStore } from 'pinia'
import axios from 'axios'

export const UserStored = defineStore('user',{
    state : ()=>({
        user:{
            'id':null,
            'username':null,
            'email':null,
            'access':null,
            'refresh':null,
            'is_auth':false
        }
    }),
    actions:{
        initUser(){
            if(localStorage.getItem('access')){
                this.user.id = localStorage.getItem('id')
                this.user.username = localStorage.getItem('username')
                this.user.email = localStorage.getItem('email')
                this.user.refresh = localStorage.getItem('refresh')
                this.user.access = localStorage.getItem('access')
                this.user.is_auth = true
                this.refreshTokin()
            }
            // this.refreshTokin()
        },
        setToken(data){
            console.log(data)
            this.user.refresh = data.refresh
            this.user.access = data.access
            this.is_auth = true

            localStorage.setItem('access',this.user.access)
            localStorage.setItem('refresh',this.user.refresh)
        },
        removeData(){
            this.user.id = null
            this.user.username = null
            this.user.email = null
            this.user.refresh = null
            this.user.access = null
            this.user.is_auth = false

            localStorage.setItem('id','')
            localStorage.setItem('username','')
            localStorage.setItem('email','')
            localStorage.setItem('access','')
            localStorage.setItem('refresh','')
        },
        setuserInfo(data){
            this.user.id = data.id
            this.user.username = data.username
            this.user.email = data.email

            localStorage.setItem('id',this.user.id)
            localStorage.setItem('username',this.user.username)
            localStorage.setItem('email',this.user.email)
            console.log(data)
        },refreshTokin(){
            axios.post('/api/token/refresh/',{refresh : this.user.refresh}).then((res)=>{
                console.log(res)
                this.user.access = res.data.access
                this.user.is_auth = true
                localStorage.setItem('access',this.user.access)

                axios.defaults.headers.common['Authorization'] = "Bearer "+this.user.access
                console.log(axios.defaults.headers.common['Authorization'])
            }).catch((res)=>{
                console.log(res)
                this.removeData()
            })
        }
    }
})