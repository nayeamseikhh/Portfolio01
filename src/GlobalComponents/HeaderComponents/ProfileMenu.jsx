import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiMail, FiUser, FiX } from "react-icons/fi";
import { signOut } from "firebase/auth";

import Login from "../auth/login";
import { auth } from "../../firebase.config";

const ProfileMenu = ({ currentUser, mobile = false, onCloseMobile }) => {
  const [open, setOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!currentUser) {
    return <Login />;
  }

  const providerId = currentUser.providerData?.[0]?.providerId || "";

  const providerName = providerId.includes("google")
    ? "Google"
    : providerId.includes("github")
      ? "GitHub"
      : "Email";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      onCloseMobile?.();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      ref={profileRef}
      className={`relative ${mobile ? "w-full" : "shrink-0"}`}
    >
      {/* Avatar */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Open profile"
        title={currentUser.displayName || "Profile"}
        className={
          mobile
            ? `
              flex min-h-[46px] w-full
              items-center justify-center gap-2.5
              rounded-lg border border-orange/30
              bg-black02 px-4 py-2.5
              font-poppins text-sm font-semibold
              text-orange transition-all duration-300
              hover:border-orange hover:bg-orange hover:text-white
              sm:text-base
            `
            : `
              flex h-9 w-9 shrink-0
              items-center justify-center
              overflow-hidden rounded-full
              border border-orange/40
              bg-black02 text-orange
              transition-all duration-300
              hover:border-orange hover:bg-orange hover:text-white
              hover:shadow-[0_0_15px_rgba(224,130,45,0.25)]
              lg:h-10 lg:w-10
            `
        }
      >
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName || "Profile"}
            className={
              mobile
                ? "h-7 w-7 rounded-md object-cover"
                : "h-full w-full object-cover"
            }
          />
        ) : (
          <FiUser className={mobile ? "text-xl" : "text-lg"} />
        )}

        {mobile && <span>Profile</span>}
      </button>

      {/* Profile Card */}

      {open && (
        <div
          className={
            mobile
              ? `
                mt-2 w-full overflow-hidden rounded-2xl
                border border-white/[0.08]
                bg-[#111111] shadow-2xl
              `
              : `
                absolute right-0 top-[calc(100%+12px)]
                z-[100] w-[300px]
                overflow-hidden rounded-2xl
                border border-white/[0.08]
                bg-[#111111]/98
                shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
              `
          }
        >
          {/* Header */}

          <div className="border-b border-white/[0.08] p-5">
            <div className="flex items-center gap-3">
              <Avatar user={currentUser} size="large" />

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-poppins text-base font-semibold text-white">
                  {currentUser.displayName || "Portfolio Visitor"}
                </h3>

                <p className="truncate font-poppins text-xs text-gray-400">
                  {currentUser.email || "No email available"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close profile"
                className="
                  flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-lg text-gray-400
                  transition-colors
                  hover:bg-white/[0.05] hover:text-white
                "
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* Details */}

          <div className="space-y-2 p-4">
            <InfoRow
              icon={<FiMail />}
              label="Email"
              value={currentUser.email || "Not available"}
            />

            <InfoRow
              icon={<FiUser />}
              label="Signed in with"
              value={providerName}
            />

            <div
              className="
                flex items-center justify-between
                rounded-xl border border-white/[0.05]
                bg-white/[0.025] px-3 py-3
              "
            >
              <div>
                <p className="font-poppins text-[10px] uppercase tracking-wider text-gray-500">
                  Account
                </p>

                <p className="font-poppins text-xs text-gray-200">Active</p>
              </div>

              <span
                className="
                  h-2 w-2 rounded-full bg-green-400
                  shadow-[0_0_8px_rgba(74,222,128,0.7)]
                "
              />
            </div>
          </div>

          {/* Logout */}

          <div className="border-t border-white/[0.08] p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="
                flex w-full items-center justify-center
                gap-2 rounded-xl
                border border-red-500/20
                bg-red-500/5 px-4 py-2.5
                font-poppins text-sm font-medium
                text-red-400 transition-all duration-300
                hover:border-red-500/40
                hover:bg-red-500/10
              "
            >
              <FiLogOut />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   AVATAR
========================================================= */

const Avatar = ({ user, size = "small" }) => {
  const sizeClass = size === "large" ? "h-12 w-12" : "h-9 w-9";

  return (
    <div
      className={`
        ${sizeClass}
        flex shrink-0 items-center justify-center
        overflow-hidden rounded-full
        border border-orange/40
        bg-black02 text-orange
      `}
    >
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || "Profile"}
          className="h-full w-full object-cover"
        />
      ) : (
        <FiUser className="text-xl" />
      )}
    </div>
  );
};

/* =========================================================
   INFO ROW
========================================================= */

const InfoRow = ({ icon, label, value }) => {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-xl border border-white/[0.05]
        bg-white/[0.025] px-3 py-3
      "
    >
      <div
        className="
          flex h-8 w-8 shrink-0
          items-center justify-center
          rounded-lg bg-orange/10
          text-orange
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-poppins text-[10px] uppercase tracking-wider text-gray-500">
          {label}
        </p>

        <p className="truncate font-poppins text-xs text-gray-200">{value}</p>
      </div>
    </div>
  );
};

export default ProfileMenu;
