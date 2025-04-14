import Header from "@/components/Header";
import { ChildrenProps } from "@/types";
import { ClerkProvider, SignedOut, SignInButton } from "@clerk/nextjs";

const layout = ({ children }: ChildrenProps) => {
  return (
    <div>
      <ClerkProvider>
        <Header />
        {children}
      </ClerkProvider>
    </div>
  );
};

export default layout;
