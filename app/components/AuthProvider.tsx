"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

// type AuthProviderProps = {
//   children: ReactNode;
// };

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
