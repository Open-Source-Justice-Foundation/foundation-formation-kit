import LogoDark from "/images/svgs/logos/logo-dark.svg";
import Logo from "/images/svgs/logos/logo.svg";

export function FFKLogo() {
  return (
    <>
      <Logo width="25" height="31" className="dark:hidden" />
      <LogoDark width="25" height="31" className="hidden dark:block" />
    </>
  );
}
