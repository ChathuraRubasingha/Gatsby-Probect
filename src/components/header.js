import React from 'react'
import Link from 'gatsby-link'
import './Header.css'
import StripeCheckout from 'react-stripe-checkout'

class Header extends React.Component {
constructor(props){
super(props)

  this.state={
    hasScrolled: false
  }
}

componentDidMount () {
  window.addEventListener('scroll', this.handleScroll)
}

handleScroll = (event) => {
  const scrollTop = window.pageYOffset

  if (scrollTop > 50) {
    this.setState({hasScrolled: true})
  }else{
    this.setState({hasScrolled: false})
  }
}
handlePurchase = (token) => {
  const amount = 5000
  const description = "My Product"

  const bodyObject = {
    tokenId: token.id,
    email: token.email,
    name: token.name,
    description,
    amount
  }
  fetch('http://localhost:9000/stripe-charge', {
    method: 'POST',
    body: JSON.stringify(bodyObject)
  })
}
  render() {
    return (
      <div className={this.state.hasScrolled?"Header HeaderScrolled" : "Header"}>
      <div className='HeaderGroup'>
      <Link to="/"><img src={require('../Images/logo-designcode.svg')} width="30" /></Link>
      <Link to="/coureses">Courses</Link>
      <Link to="/downloads">Download</Link>
      <Link to="/workshops">Workshops</Link>
      <StripeCheckout
        amount={5000}
        image=""
        token={this.handlePurchase}
        stripeKey={'pk_test_51MHl1YSDLamgZd3kyHoLdezjEhat1lgvxQYe52Dn1aH0DPCGpeqcpt1E8akLOAY7ESnlk1EKqecfNib1ZHxMwkC400JBBGrlgz'}
      >
        <button>Buy</button>
      </StripeCheckout>
    </div>
  </div>

    )
  }
}

export default Header
