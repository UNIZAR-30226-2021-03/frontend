export const NavbarItems = [
    {
        title: 'LOGIN',
        url: '/login',
        cName: 'nav-links',
        showLoggedUser: false,
    },
    {
        title: 'SIGNUP',
        url: '/signup',
        cName: 'nav-links',
        showLoggedUser: false,
    },
    {
        title: 'LOGOUT',
        url: '',
        cName: 'nav-links',
        showLoggedUser: true,
        clickBehav: 'handleSignOut'
    }
    //,
    //{
    //    title: 'Sign-UP',
    //    url: '/sign-up',
    //    cName: 'nav-links2'
    //},
    //{
    //  title: 'Sign-UP',
    //  url: '/sign-up',
    //  cName: 'nav-links-mobile' // no funciona
    //}
]