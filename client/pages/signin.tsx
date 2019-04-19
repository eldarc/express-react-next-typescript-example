import * as React from 'react'

// ~~~ Layout ~~~
// import Link from 'next/link'
import Layout from '@/layouts/Default'

// ~~~ Components ~~~
import SigninBox from '@/components/Sections/SigninBox'

// ~~~ Component ~~~
const SigninPage: React.FunctionComponent = () => (
    <Layout centered={true} accessLevel="guest" title="Sign in to LikeBase">
        <div className="row h-100 signin">
            <div className="col d-flex align-items-center justify-content-center">
              <SigninBox/>
            </div>
        </div>

        {/*language=SCSS*/}
        <style jsx>{`
          .page {
          }
        `}</style>
    </Layout>
)

export default SigninPage
