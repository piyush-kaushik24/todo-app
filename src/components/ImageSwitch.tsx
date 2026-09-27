import {
  bgDesktopDark,
  bgDesktopLight,
  bgMobileDark,
  bgMobileLight,
} from "../assets";

type ImageSwitchProps = {
  theme: boolean;
};
export const ImageSwitch = ({ theme }: ImageSwitchProps) => {
  return (
    <div className="z-0">
      {theme ? (
        <picture>
          <source srcSet={bgDesktopDark} media="(min-width:768px)" />
          <img
            src={bgMobileDark}
            alt=""
            className="absolute top-0 left-0 w-full object-cover"
          />
        </picture>
      ) : (
        <picture>
          <source srcSet={bgDesktopLight} media="(min-width:768px)" />
          <img
            src={bgMobileLight}
            alt=""
            className="absolute top-0 left-0 w-full object-cover"
          />
        </picture>
      )}
    </div>
  );
};
