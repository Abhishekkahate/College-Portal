/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare module 'next/link' {
    import React from 'react';
    import { LinkProps as NextLinkProps } from 'next/dist/client/link';

    export interface LinkProps extends NextLinkProps {
        className?: string;
        children?: React.ReactNode;
    }

    const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
    export default Link;
}

declare module 'next/navigation' {
    export function useRouter(): {
        push: (href: string) => void;
        replace: (href: string) => void;
        back: () => void;
        forward: () => void;
        refresh: () => void;
        prefetch: (href: string) => void;
    };
    export function usePathname(): string;
    export function useSearchParams(): URLSearchParams;
    export function useParams(): Record<string, string | string[]>;
}
