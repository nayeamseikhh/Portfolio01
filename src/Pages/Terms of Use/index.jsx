import React from "react";
import { Link } from "react-router";

const TermsOfUse = () => {
  return (
    <main className="min-h-screen bg-[#121212] px-4 py-16 text-white sm:px-6 lg:px-8 mt-6">
      <div className="mx-auto max-w-5xl">
        {/* =========================
            HEADER
        ========================= */}
        <section className="mb-12">
          <p className="font-poppins text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Legal
          </p>

          <h1 className="mt-3 font-poppins text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Terms of Use
          </h1>

          <p className="mt-5 max-w-3xl font-poppins text-sm leading-7 text-white/50 sm:text-base">
            Welcome to Nayeam Seikh&apos;s portfolio website. These Terms of Use
            explain the rules and conditions that apply when you access and use
            this website.
          </p>

          <div className="mt-6 h-px w-full bg-white/10" />

          <p className="mt-5 font-poppins text-xs text-white/40">
            Last updated: August 2026
          </p>
        </section>

        {/* =========================
            CONTENT
        ========================= */}
        <section className="space-y-10">
          {/* 01 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              1. Acceptance of These Terms
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              By accessing or using this website, you acknowledge that you have
              read, understood, and agree to these Terms of Use. If you do not
              agree with any part of these terms, please do not use this
              website.
            </p>
          </article>

          {/* 02 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              2. About This Website
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              This website is the personal professional portfolio of
              <span className="font-semibold text-white"> Nayeam Seikh</span>, a
              MERN Stack Developer.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              The website is intended to showcase professional skills,
              experience, projects, technologies, services, and ways to get in
              touch for potential freelance, collaboration, and development
              opportunities.
            </p>
          </article>

          {/* 03 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              3. Permitted Use
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              You may use this website for lawful and legitimate purposes,
              including:
            </p>

            <ul className="mt-4 space-y-3 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>
                  Viewing portfolio projects and professional information.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>Learning about available web development services.</span>
              </li>

              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>
                  Contacting Nayeam regarding projects, freelance work,
                  collaboration, or professional opportunities.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>
                  Sharing links to this website through social media or
                  professional networks.
                </span>
              </li>
            </ul>
          </article>

          {/* 04 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              4. Prohibited Activities
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              You agree not to use this website in a way that could damage,
              disrupt, overload, or interfere with the website or its services.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              You must not attempt to:
            </p>

            <ul className="mt-4 space-y-3 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>
                  Gain unauthorized access to the website, server, API,
                  database, or other systems.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>
                  Introduce malicious software, harmful code, or other security
                  threats.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>
                  Scrape, copy, reproduce, or systematically collect website
                  content without permission.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-orange-500">•</span>
                <span>
                  Use the website for unlawful, fraudulent, abusive, or
                  misleading activities.
                </span>
              </li>
            </ul>
          </article>

          {/* 05 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              5. Intellectual Property
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Unless otherwise stated, the content presented on this website,
              including text, graphics, visual designs, logos, personal
              branding, images, and original website materials, belongs to
              Nayeam Seikh or is used with appropriate permission or license.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              You may view the website and share links to publicly available
              pages for personal or professional reference. However, you may not
              reproduce, redistribute, sell, modify, or commercially exploit
              website content without prior written permission.
            </p>
          </article>

          {/* 06 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              6. Portfolio Projects
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Projects displayed on this website are provided as examples of
              development work, technical capabilities, design approaches, and
              professional experience.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Some projects may have been developed for clients, organizations,
              personal experimentation, or demonstration purposes. Ownership and
              usage rights for individual client projects may be governed by
              separate agreements.
            </p>
          </article>

          {/* 07 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              7. Freelance and Development Services
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Information presented on this website regarding web development,
              application development, APIs, databases, authentication,
              integrations, and other technical services is provided for general
              informational purposes.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Sending an inquiry, email, message, or project request does not
              automatically create a client relationship or binding development
              agreement.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Project scope, pricing, deadlines, deliverables, revisions,
              maintenance, ownership, licensing, payment terms, and other
              project-specific conditions should be agreed upon separately
              before development work begins.
            </p>
          </article>

          {/* 08 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              8. Contact and Inquiry Information
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              If you contact Nayeam through the website, email, social media, or
              another available communication method, please provide accurate
              information so that your request can be properly understood and
              answered.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Contact information should not be used to send spam, fraudulent
              messages, malicious content, or unsolicited promotional material.
            </p>
          </article>

          {/* 09 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              9. Third-Party Links and Services
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              This website may contain links to third-party websites and
              platforms, including professional networking, social media,
              hosting, authentication, image hosting, or other external
              services.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              These third-party websites operate independently and may have
              their own terms, privacy policies, and practices. Nayeam Seikh is
              not responsible for the content, availability, security, or
              practices of external websites.
            </p>
          </article>

          {/* 10 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              10. Website Availability
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              I aim to keep this website available and functional, but I do not
              guarantee that the website will always be available,
              uninterrupted, error-free, or free from technical issues.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              Website features, content, services, technologies, and links may
              be updated, changed, temporarily unavailable, or removed without
              prior notice.
            </p>
          </article>

          {/* 11 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              11. Disclaimer
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              The information on this website is provided for general
              informational and professional portfolio purposes. While
              reasonable efforts are made to keep information accurate and
              current, no guarantee is made that every piece of information will
              always be complete, accurate, or up to date.
            </p>
          </article>

          {/* 12 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              12. Limitation of Liability
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              To the extent permitted by applicable law, Nayeam Seikh will not
              be responsible for losses or damages resulting from your use of,
              or inability to use, this website or from your reliance on
              information presented on the website.
            </p>
          </article>

          {/* 13 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              13. Changes to These Terms
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              These Terms of Use may be updated from time to time to reflect
              changes to the website, services, technology, or applicable
              requirements.
            </p>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              When changes are made, the updated version will be published on
              this page with a revised “Last updated” date.
            </p>
          </article>

          {/* 14 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              14. Governing Law
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              These Terms are intended to be interpreted in accordance with
              applicable laws and regulations. Any formal agreement for
              freelance or development work may contain separate provisions
              regarding applicable law and dispute resolution.
            </p>
          </article>

          {/* 15 */}
          <article>
            <h2 className="font-poppins text-2xl font-bold text-white">
              15. Contact
            </h2>

            <p className="mt-4 font-poppins text-sm leading-7 text-white/60 sm:text-base">
              If you have any questions about these Terms of Use, website
              content, or professional services, you can get in touch with me
              through the contact page.
            </p>

            <Link
              to="/get_in_touch"
              className="
                mt-6
                inline-flex
                items-center
                rounded-xl
                border
                border-orange-500/40
                bg-orange-500/10
                px-6
                py-3
                font-poppins
                text-sm
                font-semibold
                text-orange-500
                transition-all
                duration-300
                hover:border-orange-500
                hover:bg-orange-500
                hover:text-white
              "
            >
              Get In Touch →
            </Link>
          </article>
        </section>

        {/* =========================
            FOOTER NOTE
        ========================= */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="font-poppins text-xs leading-6 text-white/30">
            By continuing to use this website, you acknowledge that you have
            read and understood these Terms of Use.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsOfUse;
