import { iconMoon, iconSun } from "../assets";
type HeaderProps = {
  theme: boolean;
  onTheme: (theme: boolean) => void;
};
export const Header = ({ theme, onTheme }: HeaderProps) => {
  return (
    <header className="my-10 flex items-start justify-between text-4xl">
      <h1 className="cursor-pointer font-extrabold text-white">
        <a href="#">TODO</a>
      </h1>
      <button
        aria-label={theme ? "Switch to light theme" : " Switch to Dark theme"}
        type="button"
        onClick={() => onTheme(!theme)}
        className="cursor-pointer"
      >
        {theme ? <img src={iconSun} alt="" /> : <img src={iconMoon} alt="" />}
      </button>
    </header>
  );
};
