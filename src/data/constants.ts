export const navData = [
  {
    title: "Home",
    href: "/",
    src: {
      light: "/home-light.svg",
      dark: "/home.svg",
    },
  },
  {
    title: "Explore",
    href: "/explore",
    src: {
      light: "/search-light.svg",
      dark: "/search.svg",
    },
  },
  {
    title: "My music DAOs",
    href: "/my-music-daos",
    src: {
      light: "/stack-light.svg",
      dark: "/stack.svg",
    },
  },
  {
    title: "Liked songs",
    href: "/",
    src: {
      light: "/heart-light.svg",
      dark: "/heart.svg",
    },
  },
  {
    title: "My favorite songs",
    href: "/",
    src: {
      light: "/star-light.svg",
      dark: "/star.svg",
    },
  },
];

export interface NavData {
  title: string;
  href: string;
  src: {
    light: string;
    dark: string;
  };
}

export const uploadButtonEnum = {
  UPLOAD_COVER: "UPLOAD_COVER",
  UPLOAD_SONG: "UPLOAD_SONG",
};
