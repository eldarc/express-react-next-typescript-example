import * as React from 'react'

// ~~~ Layout ~~~
// import Link from 'next/link'
import Layout from '@/layouts/Default'

// ~~~ Components ~~~
import ChangePasswordBox from '@/components/Sections/ChangePasswordBox'

// ~~~ Component ~~~
const ChangePasswordPage: React.FunctionComponent = () => (
  <Layout centered={true} accessLevel="user" title="Change password">
      <div className="row h-100 signin">
          <div className="col d-flex align-items-center justify-content-center">
            <ChangePasswordBox/>
          </div>
      </div>

      {/*language=SCSS*/}
      <style jsx>{`
        .page {
        }
      `}</style>
  </Layout>
)

export default ChangePasswordPage
