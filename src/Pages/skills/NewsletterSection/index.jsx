import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);
      setStatus("");

      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Subscription failed.");
      }

      setStatus("Thanks! You have been subscribed.");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#121212] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Side */}
          <div>
            <p className="font-poppins text-sm font-semibold uppercase tracking-[4px] text-white/50">
              Let's Work Together
            </p>

            <h2 className="mt-4 font-poppins text-5xl font-bold text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,.6)] md:text-7xl">
              Mail Us!
            </h2>

            <p className="mt-5 max-w-lg font-poppins text-sm leading-7 text-white/45 sm:text-base">
              Stay connected with us and receive updates, new projects,
              insights, and useful information directly in your inbox.
            </p>
          </div>

          {/* Right Side */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Mail Address"
                required
                disabled={loading}
                className="w-full bg-transparent px-6 py-4 text-white placeholder:text-gray-500 outline-none disabled:opacity-50 sm:px-8 sm:py-5"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-red-500 px-8 py-4 font-poppins font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_40px_rgba(239,68,68,.8)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Subscribe"}
              </button>
            </form>

            {/* Status */}
            {status && (
              <p className="mt-4 px-2 font-poppins text-sm text-white/60">
                {status}
              </p>
            )}

            <p className="mt-4 px-2 text-xs text-white/30">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
