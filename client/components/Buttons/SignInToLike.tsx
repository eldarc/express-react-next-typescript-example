import * as React from 'react'
import { Button } from 'reactstrap'
import Link from 'next/link'

const SignInToLike: React.FunctionComponent = () => {
  return (
    <Link href="/signin">
      <Button className="signin-to-like-btn" size="sm" color="primary">
        Sign in to like
      </Button>
    </Link>
  )
}

export default SignInToLike
