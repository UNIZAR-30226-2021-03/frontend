export const NavbarItems = [
    {
        key: "1",
        title: 'LOGIN',
        url: '/login',
        cName: 'nav-links',
        private: false,
    },
    {
        key: "2",
        title: 'SIGNUP',
        url: '/signup',
        cName: 'nav-links',
        private: false,
    },
    {
        key: "3",
        title: 'LOGOUT',
        url: '/',
        cName: 'nav-links',
        private: true,
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