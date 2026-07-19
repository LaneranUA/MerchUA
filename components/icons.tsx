import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7.8v4.7l3.1 1.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </BaseIcon>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M4.5 7.5A2.5 2.5 0 0 1 7 5h9.5A2.5 2.5 0 0 1 19 7.5v9A2.5 2.5 0 0 1 16.5 19H7A2.5 2.5 0 0 1 4.5 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M15.5 12h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <circle cx="15.5" cy="12" r="0.9" fill="currentColor" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="m13 7 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </BaseIcon>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="m20 4-2.7 13.4c-.2 1-1 1.2-1.8.7l-4-2.9-1.9 1.9c-.2.2-.4.4-.8.4l.3-4.2L16.7 7c.3-.3-.1-.5-.5-.2l-9.4 5.9-4-1.2c-.9-.3-.9-.9.2-1.3L18.2 4c.8-.3 1.5.2 1.8 0Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </BaseIcon>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        width="16"
        x="4"
        y="8"
      />
      <path
        d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" />
    </BaseIcon>
  );
}
