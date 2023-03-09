import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

interface UserLoginInformationState {
  user: User | undefined;
  isLoggedIn: boolean | undefined;
}

interface ProtectedProps {
  children: React.ReactNode;
}

export function SetLastUrlToSessionStorage(
  lastUrl: string = window.location.pathname
): void {
  window.sessionStorage.setItem("lastUrl", lastUrl);
}

export function GetLastUrlFromSessionStorage(): string {
  const lastUrl = window.sessionStorage.getItem("lastUrl");
  return lastUrl ? lastUrl : "/";
}

const Protected: React.FC<ProtectedProps> = (props) => {
  const navigate = useNavigate();
  const [userLoginInformation, SetUserLoginInformation] =
    useState<UserLoginInformationState>({
      user: undefined,
      isLoggedIn: undefined,
    });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        SetUserLoginInformation({ user: currentUser, isLoggedIn: true });
        console.log("user is logged in");
      } else {
        SetUserLoginInformation({ user: undefined, isLoggedIn: false });
        console.log("user is not logged in");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userLoginInformation.isLoggedIn === false) {
      SetLastUrlToSessionStorage();
      navigate("/login");
    }
  }, [userLoginInformation.isLoggedIn]);

  return userLoginInformation.isLoggedIn ? (
    <>
      {React.cloneElement(props.children as ReactElement, {
        userLoginInformation,
      })}
    </>
  ) : null;
};
export default Protected;
