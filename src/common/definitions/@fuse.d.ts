declare module '@fuse';
declare module '@fuse/core/FusePageSimple' {
  export default function FusePageSimple(
    props: FusePageSimpleProps,
  ): JSX.Element;
}

interface FusePageSimpleProps {
  leftSidebarHeader?: import('react').ReactNode;
  leftSidebarContent?: import('react').ReactNode;
  leftSidebarVariant?: import('react').ReactNode;
  rightSidebarHeader?: import('react').ReactNode;
  rightSidebarContent?: import('react').ReactNode;
  rightSidebarVariant?: import('react').ReactNode;
  header?: import('react').ReactNode;
  content?: import('react').ReactNode;
  contentToolbar?: import('react').ReactNode;
  sidebarInner?: boolean;
  innerScroll?: boolean;
  classes?: any; // Fix for CSS clases
  className?: any; // Fix for CSS clases
  ref?: import('react').Ref; // Fix for refs
}

declare module '@fuse/core/FusePageCarded' {
  export default function FusePageCarded(
    props: FusePageCardedProps,
  ): JSX.Element;
}

interface FusePageCardedProps {
  leftSidebarHeader?: import('react').ReactNode;
  leftSidebarContent?: import('react').ReactNode;
  leftSidebarVariant?: import('react').ReactNode;
  rightSidebarHeader?: import('react').ReactNode;
  rightSidebarContent?: import('react').ReactNode;
  rightSidebarVariant?: import('react').ReactNode;
  header?: import('react').ReactNode;
  content?: import('react').ReactNode;
  contentToolbar?: import('react').ReactNode;
  innerScroll?: boolean;
  classes?: any; // Fix for CSS clases
  className?: any; // Fix for CSS clases
  ref?: import('react').Ref; // Fix for refs
}

declare module '@fuse/core/FuseAnimate';
declare module '@fuse/core/FuseAnimateGroup';
