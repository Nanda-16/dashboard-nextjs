export const AlertStyles = {
  alert: `my-1 rounded px-1 sm:px-6 py-1 sm:py-3 border fixed z-20 top-[64px] sm:top-[50px] right-2 sm:right-8 lg:right-16`,
  variant: {
    primary: `border-[#bce8f1] bg-[#d9edf7] text-[#3a87b6]`,
    success: `border-[#d6e9c6] bg-[#dff0d8] text-[#468847]`,
    warning: `border-[#fbeed5] bg-[#fcf8e3] text-[#c09868]`,
    danger: `border-[#eed3d7] bg-[#f2dede] text-[#c04a48]`,
  },
};

export const ButtonStyles = {
  btn: `focus:outline-none outline-none text-centerfont-medium`,
  variant: {
    primary: `text-white m-1 bg-violet-600 hover:bg-violet-400 focus:bg-violet-400 rounded`,
    "outline-primary": `m-1 text-violet-600 border border-violet-600 hover:bg-violet-100 focus:bg-violet-100 rounded`,
    "icon-primary": `text-white bg-violet-600 hover:bg-violet-400 focus:bg-violet-400`,
    secondary: `m-1 hover:text-white bg-neutral-200 hover:bg-neutral-400 focus:bg-neutral-400 focus:text-white rounded`,
    success: `m-1 text-white bg-green-600 hover:bg-green-500 hover:border hover:border-green-600 focus:bg-green-500 rounded`,
    danger: `m-1 text-white bg-red-600 hover:bg-red-500 focus:bg-red-500 hover:border hover:border-red-600 rounded`,
    "icon-danger": `text-white bg-red-600 hover:bg-red-500 focus:bg-red-500`,
  },
  size: {
    default: `text-base sm:px-4 md:px-6 px-2 py-2`,
    sm: `md:text-base text-sm sm:px-3 md:px-5 px-2 py-1`,
    lg: `md:text-lg text-base sm:text-sm sm:px-4 md:px-6 px-3 py-3`,
    icon: `text-sm px-2 py-2`,
  },
};

export const CardStyles = {
  card: `rounded shadow mt-10 sm:mt-2 mx-auto mb-2`,
  head: `border-b p-2 text-lg bg-neutral-50`,
  title: "col-span-4 text-lg sm:text-2xl font-bold",
  subtitle: `col-start-1 col-span-3 font-semibold text-sm sm:text-base text-slate-300`,
  action: `col-start-5 col-end-8 text-end`,
  footer: `py-2 flex justify-end `,
};

export const ContainerStyles = {
  container: `pt-24 w-3/4 mx-auto`,
};

export const FormStyles = {
  form: {
    box: `md:w-3/4`,
    field: `md:flex md:items-center md:px-0 px-2 pt-2 mb-2`,
    label: `block mb-2 inline text-sm font-semibold md:text-left cursor-pointer`,
    textarea: `border border-gray-300 text-gray-900 text-sm focus:outline-none w-full caret-neutral-400 p-2.5 resize-none`,
    select: `border border-gray-300 text-gray-900 text-sm focus:outline-none w-full ps-2.5 py-3 pe-4`,
    option: `text-neutral-500 font-semibold `,
  },
  input: {
    text: `border border-gray-300 text-gray-900 text-sm focus:outline-none w-full p-2.5 caret-neutral-400`,
    checkbox: `accent-violet-600 w-4 h-4`,
    file: `text-gray-900 text-sm focus:outline-none w-full p-2.5`,
  },
};

export const ModalStyles = {
  header: `text-lg font-semibold leading-6`,
  footer: `text-center py-2 flex items-end justify-end px-3 md:px-6 gap-2`,
};

export const NavbarStyles = {
  navbar: `px-4 py-2 mb-10 sm:mb-0 shadow w-full lg:flex lg:flex-row lg:items-center lg:justify-start fixed top-0 z-10`,
  head: `cursor-pointer font-bold inline-block mr-4 py-1.5 text-2xl md:text-3xl whitespace-nowrap hover:text-violet-200`,
  toggler: `block float-right text-4xl lg:hidden focus:outline-none focus:shadow`,
  item: `whitespace-pre cursor-pointer px-4 py-2`,
  link: ` hover:underline`,
  collapse: {
    default: `border-t border-gray-400 fixed left-0 mt-2 shadow py-2 text-center lg:border-none lg:flex lg:flex-grow lg:items-center lg:mt-0 lg:py-0 lg:relative lg:shadow-none`,
    open: `h-auto visible transition-all duration-500 ease-out w-full opacity-100 lg:transition-none backdrop-brightness-75`,
    close: `h-auto invisible w-0 transition-all duration-300 ease-in lg:opacity-100 lg:transition-none lg:visible`,
  },
  nav: {
    start: `block mb-0 mr-auto pl-0 lg:flex lg:mb-0 lg:pl-0`,
    middle: `block mb-0 ml-auto pl-0 lg:flex lg:pl-0 lg:mb-0 lg:mx-auto`,
    end: `block pl-0 mb-0 ml-auto lg:flex lg:pl-0 lg:mb-0`,
  },
};

export const PaginationStyles = {
  ul: `inline-flex -space-x-px my-2`,
  prev: `ml-0 rounded-l-md`,
  next: `rounded-r-md`,
  li: `px-1 sm:px-3 py-2 leading-tight bg-neutral-600 border-gray-800 text-gray-300 hover:bg-neutral-700 hover:text-white`,
  disabled: `px-1 sm:px-3 py-2 leading-tight bg-neutral-600 border-gray-800 text-gray-500`,
  active: `px-1 sm:px-3 py-2 hover:bg-violet-100 hover:text-violet-700 border-gray-800 bg-neutral-700 text-white`,
};

export const TableStyles = {
  table: {
    main: `flex flex-col overflow-x-auto`,
    sub: `overflow-x-auto`,
    box: `inline-block min-w-full`,
    parent: `overflow-hidden`,
    table: `w-full text-left text-sm font-semibold`,
  },
  thead: {
    thead: `bg-neutral-500 text-white font-medium`,
    theadrow: `px-3 py-3`,
  },
  tbodyrow: `whitespace-nowrap px-3 py-3`,
};