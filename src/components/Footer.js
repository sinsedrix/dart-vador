import React from 'react'

const Footer = ({timeout}) => (
    <footer id="footer" style={timeout ? {display: 'none'} : {}}>
        <p className="copyright">&copy; Dart Vador.
         By <a href="https://github.com/sinsedrix">sinsedrix</a>.
         Built with: <a href="https://www.gatsbyjs.org/">Gatsby.js</a></p>
    </footer>
)

export default Footer
