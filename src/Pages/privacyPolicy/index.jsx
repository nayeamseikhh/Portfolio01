import React from "react";
import Container from "../../GlobalComponents/Container";

const PrivacyPolicy = () => {
  return (
    <section className="min-h-screen bg-[#121212] text-white py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-poppins text-3xl font-semibold sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm text-gray-400">
              Last updated: August 7, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-10 text-sm leading-7 text-gray-300 sm:text-base">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                1. Introduction
              </h2>

              <p>
                Welcome to Nayeam's Portfolio. This Privacy Policy explains how
                information may be collected, used, stored, and protected when
                you visit or interact with this website.
              </p>

              <p className="mt-4">
                By using this website, you agree to the practices described in
                this Privacy Policy. If you do not agree with this policy,
                please do not use the website.
              </p>
            </section>

            {/* Information */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                2. Information We Collect
              </h2>

              <p>
                Depending on how you interact with the website, we may collect
                limited information such as:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Your name or email address when you contact me.</li>
                <li>
                  Messages or questions submitted through contact or AI chat
                  features.
                </li>
                <li>
                  Technical information such as browser type, device type,
                  operating system, and basic usage information.
                </li>
                <li>
                  Information voluntarily provided by you when communicating
                  through this website.
                </li>
              </ul>
            </section>

            {/* AI */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                3. AI Assistant and RAG
              </h2>

              <p>
                This portfolio may provide an AI-powered assistant designed to
                answer questions about my background, skills, projects,
                experience, and services.
              </p>

              <p className="mt-4">
                The AI assistant may process your submitted questions in order
                to generate a response. The system may use a Retrieval-Augmented
                Generation (RAG) architecture to retrieve relevant portfolio
                information before generating an answer.
              </p>

              <p className="mt-4">
                Please do not submit passwords, financial information,
                government identification numbers, or other highly sensitive
                personal information through the AI assistant.
              </p>
            </section>

            {/* MongoDB */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                4. Data Storage
              </h2>

              <p>
                Some website information may be stored in a database to allow
                the website and its features to operate properly.
              </p>

              <p className="mt-4">
                The backend of this website may use MongoDB to store portfolio
                information and, depending on the implementation, information
                submitted through certain website features.
              </p>
            </section>

            {/* How we use */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                5. How Information Is Used
              </h2>

              <p>Information may be used to:</p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Provide and maintain website functionality.</li>
                <li>Respond to messages and inquiries.</li>
                <li>Operate the AI assistant.</li>
                <li>Improve website performance and user experience.</li>
                <li>
                  Protect the website against abuse or unauthorized activity.
                </li>
                <li>Troubleshoot technical problems.</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                6. Cookies and Local Storage
              </h2>

              <p>
                This website may use browser storage technologies such as
                cookies or localStorage to remember preferences and improve
                functionality.
              </p>

              <p className="mt-4">
                For example, the website may store preferences such as theme,
                language, or other interface settings locally in your browser.
              </p>
            </section>

            {/* Third Party */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                7. Third-Party Services
              </h2>

              <p>
                This website may use third-party services to provide hosting,
                database, AI, analytics, authentication, image storage, or other
                functionality.
              </p>

              <p className="mt-4">
                These third-party providers may process information according to
                their own privacy policies and terms of service.
              </p>
            </section>

            {/* External Links */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                8. External Links
              </h2>

              <p>
                My portfolio may contain links to external websites such as
                GitHub, LinkedIn, project demos, social media platforms, or
                other websites.
              </p>

              <p className="mt-4">
                I am not responsible for the privacy practices, content, or
                security of external websites. Please review their respective
                privacy policies before providing personal information.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                9. Data Security
              </h2>

              <p>
                Reasonable technical and organizational measures are used to
                protect information handled by this website. However, no
                internet transmission or electronic storage system can be
                guaranteed to be completely secure.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                10. Data Retention
              </h2>

              <p>
                Information is retained only for as long as reasonably necessary
                for the purpose for which it was collected, unless a longer
                retention period is required by law or necessary for legitimate
                business or security purposes.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                11. Children's Privacy
              </h2>

              <p>
                This website is not intentionally designed to collect personal
                information from children. If you believe that a child has
                provided personal information through this website, please
                contact me so that appropriate action can be taken.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                12. Changes to This Privacy Policy
              </h2>

              <p>
                This Privacy Policy may be updated from time to time to reflect
                changes to the website, technology, services, or applicable
                requirements.
              </p>

              <p className="mt-4">
                Any changes will be reflected on this page by updating the "Last
                updated" date.
              </p>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                13. Contact
              </h2>

              <p>
                If you have questions about this Privacy Policy or how your
                information is handled, you can contact me through the contact
                information provided on this website.
              </p>

              <div className="mt-5 space-y-2">
                <p>
                  <span className="font-medium text-white">Name:</span> Nayeam
                  Seikh
                </p>

                <p>
                  <span className="font-medium text-white">Email:</span>{" "}
                  nayeamseikh1@gmail.com
                </p>
              </div>
            </section>
          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Nayeam Seikh. All rights reserved.
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyPolicy;
