import Cookies from 'js-cookie'

const auth = () => {

    const checkAuth = () => Cookies.get('token') ? true : false


    return { checkAuth }
}

export default auth