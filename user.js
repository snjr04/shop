let user ={
    email:''
}



let headerUserName = document.querySelector('.header__user-name')


if (localStorage.getItem('user')!==null){
    user = JSON.parse(localStorage.getItem('user'))
    headerUserName.textContent=`${user.name} ${user.surname}`
}


if (user.email.length){
    headerUserName.textContent=`${user.name} ${user.surname}`
}

export const changeUser =(newUser) =>{
    user=newUser
    headerUserName.textContent=`${user.name} ${user.surname}`
}