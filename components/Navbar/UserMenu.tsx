"use client";

import React, { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../app/hooks/useRegisterModal";
import useLoginModal from "../../app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "../../app/types";
import { useRouter } from "next/navigation";
import useRentModal from "../../app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {currentUser ? (
          <div className="flex gap-3">
            <div
              onClick={() => router.push("/appointment")}
              className="
                    hidden
                    md:block
                    text-sm
                    black_btn
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer"
            >
              Book online consultation
            </div>
            <div
              onClick={onRent}
              className="
                    hidden
                    md:block
                    text-sm
                    black_btn
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer"
            >
              Doctor registration
            </div>
          </div>
        ) : (
          <div className="w-14" />
        )}

        <div
          onClick={toggleOpen}
          className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Edit Profile" />
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem
                  label="Doctor registration"
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Log Out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
