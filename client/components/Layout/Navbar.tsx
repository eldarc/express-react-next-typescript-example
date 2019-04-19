import * as React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { inject, observer } from '@/node_modules/mobx-react'
import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ~~~ Assets ~~~
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTachometerAlt } from '@fortawesome/fontawesome-free-solid'
import { IconProp } from '@/node_modules/@fortawesome/fontawesome-svg-core'

// ~~~ Interfaces ~~~
interface IProps {
  [x: string]: any
}

interface IState {
  dropdownOpen: boolean
}

// ~~~ Component ~~~
@inject('store')
@observer
class AppNavbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      dropdownOpen: false
    }
  }

  public toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  public signout = async () => {
    const userId = this.props.store.user.userData._id
    await this.props.store.auth.doSignout()
    await this.props.store.overview.unignoreUser(userId)
    Router.push('/overview')
  }

  public render() {
    const userMenu = () => (
      <Nav className="ml-auto d-flex align-items-center" navbar>
        <span className="mr-3 text-gray-500">
          <span className="text-white">{this.props.store.user.userData.username}</span> | Likes: <strong className="text-white">{this.props.store.user.userData.numberOfLikes}</strong>
        </span>
        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle nav>
            <FontAwesomeIcon size="lg" icon={faCog as IconProp} />
          </DropdownToggle>
          <DropdownMenu right>
            <Link href="/change-password" passHref>
              <DropdownItem>
                Change password
              </DropdownItem>
            </Link>
            <DropdownItem onClick={this.signout}>Sign out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    )

    const guestMenu = () => (
      <div className="ml-auto d-flex align-items-center">
        <Link href="/signin" passHref>
          <Button color="info">Sign in</Button>
        </Link>
      </div>
    )

    return (
      <header>
        <Navbar color="primary" dark expand="md">
          <div className="container">
            <Link href="/" passHref>
              <NavbarBrand>
                LikeBase
              </NavbarBrand>
            </Link>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link href="/overview" passHref>
                  <NavLink>
                      <span>
                        <FontAwesomeIcon icon={faTachometerAlt as IconProp} /> Overview
                      </span>
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
            {this.props.store.auth.isAuthenticated ? userMenu() : guestMenu()}
          </div>
        </Navbar>

        {/*language=SCSS*/}
        <style jsx>{`
        .logo {
          max-height: 30px;
        }
      `}</style>
      </header>
    )
  }
}

export default AppNavbar
