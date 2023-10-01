import Link from 'next/link'
import React from 'react'

const terms = () => {
  return (
    <div className="relative overflow-hidden py-[5rem]">
      <div className="px-2">
        <div className="relative mx-auto max-w-4xl pb-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Last updated on May 09, 2023
          </p>
        </div>
      </div>
      <div className="relative px-2">
        <div className="prose-sm md:prose prose-slate dark:prose-invert prose-a:font-semibold prose-a:text-indigo-500 hover:prose-a:text-indigo-600 mx-auto max-w-4xl">
          <h2>1. Overview</h2>
          <p>
            By accessing the Site, you agree to not only this Privacy Policy,
            but also to our <Link href="/terms">terms of use</Link> and any
            other written agreements for using the Site. And you agree to our
            collection and use of any personal data (as described here) as well
            as the features of public/permissionless blockchain technology.
          </p>
          <p>
            This Privacy Policy (the “Privacy Policy”) provides a comprehensive
            description of how Lenstube (“we,” “our,” or “us”) collects, uses,
            and shares information about you in connection with the website at
            “lenstube.xyz”, as well as your rights and choices regarding such
            information.
          </p>
          <p>
            By accessing or using the Site, you accept and assume certain
            inherent features related to engaging in recording the data on the
            blockchain. Interactions with the Lens Protocol rely on smart
            contracts stored on a publicly available blockchain, cryptographic
            tokens generated by the smart contracts, and other nascent software,
            applications and systems that interact with blockchain-based
            networks. One of the defining features of blockchain technology is
            that its entries are immutable, which means, as a technical matter,
            they generally cannot be deleted or modified by anyone. If you are
            not comfortable assuming the inherently immutable and public nature
            of all entries on the blockchain, you should not engage with our
            Site.
          </p>
          <h2>2. Information Collection</h2>
          <div>
            We may collect the following information about you when you use the
            Site:{' '}
            <li>
              Information you provide such as feedback, question and issues
              reports.
            </li>
            You may choose to voluntarily provide other information to us that
            we have not solicited from you, and, in such instances, you are
            solely responsible for such information.
            <p>
              We may use tracking technologies to automatically collect
              information including the following:
            </p>
            <li>
              <b>Log Files</b>, to record events or errors that occur when using
              our Site.
            </li>
            <li>
              <b>Cookies</b>, small data stored on your device that are
              necessary for you to browse the Site.
            </li>
            <li>
              <b>Public Information</b>, data from activity that is publicly
              visible and/or accessible on blockchains. This may include
              blockchain addresses and information regarding the NFTs in
              wallets.
            </li>
          </div>
          <h2>3. Use of Information</h2>
          <p>
            We may need to use it to operate and manage the Services on this
            Site (or other places), provide you support, ensure we comply with
            laws and regulation, and enforce the security of the Site or make
            other improvements.
          </p>
          <h2>4. Third-Parties</h2>
          <p>
            This Privacy Policy does not apply to websites, apps, products, or
            services that we do not own or control. For example, your
            interactions with Ethereum wallet are governed by the applicable
            privacy policies of that particular wallet.
          </p>
          <h2>5. Analytics</h2>
          <p>
            We use Mixpanel to collect various events from user actions to
            analyse and make decisions for Site improvements.
          </p>
          <p>
            All the data are anonymous and we don't track user details such as
            name, handle, email, wallet address and so on.
          </p>
          <p>
            We may change to other third-party analytics service provider. The
            Privacy Policy of Analytics subjects to the every provider. You
            should review everything before using the Site.
          </p>
          <h2>6. Your Rights and Choices</h2>
          <div>
            <li>
              <b>Cookies</b>. We will only use strictly necessary cookies. These
              cookies are essential for you to browse the Site and use its
              features, including accessing secure areas of the Site.
            </li>
            <li>
              <b>Do Not Track</b>. Your browser settings may allow you to
              automatically transmit a “Do Not Track” signal to the online
              services you visit. Note, however, there is no industry consensus
              as to what site and app operators should do with regard to these
              signals. Accordingly, unless and until the law is interpreted to
              require us to do so, we do not monitor or take action with respect
              to “Do Not Track” signals. For more information on “Do Not Track,”
              visit{' '}
              <Link href="https://allaboutdnt.com" target="_blank">
                https://allaboutdnt.com.
              </Link>
            </li>
          </div>
          <h2>7. Data Security</h2>
          <p>
            We implement and maintain reasonable administrative, physical, and
            technical security safeguards to help protect information about you
            from loss, theft, misuse, unauthorised access, disclosure,
            alteration, and destruction. Nevertheless, transmission via the
            internet is not completely secure and we cannot guarantee the
            security of information about you.
          </p>
          <h2>8. Children</h2>
          <p>
            The Site is intended for general audiences and are not directed at
            children. To use the Site, you must legally be able to enter into
            the Agreement. We do not knowingly collect personal information from
            children.
          </p>
          <h2>9. Changes to Policy</h2>
          <p>
            We reserve the right to revise and reissue this Privacy Policy at
            any time. Any changes will be effective immediately upon our posting
            of the revised Privacy Policy. For the avoidance of doubt, your
            continued use of the Site indicates your consent to the revised
            Privacy Policy then posted.
          </p>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions or comments about this Privacy Policy, our
            data practices, or our compliance with applicable law, please
            contact us at{' '}
            <Link href="mailto:privacy@lenstube.xyz">privacy@lenstube.xyz</Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default terms