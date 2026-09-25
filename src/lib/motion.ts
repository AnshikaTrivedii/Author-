export const easeCinematic: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const easeCurtain: [number, number, number, number] = [
  0.76, 0, 0.24, 1,
];

export const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: easeCinematic },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.2, ease: easeCinematic },
  },
};

export const revealMask = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.15, ease: easeCinematic },
  },
};
