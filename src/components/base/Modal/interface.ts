export interface ModalProps {
  children?: React.ReactNode | JSX.Element,
  size?: 'sm' | 'md' | 'lg' | 'xl' | "full",
  onClose: any,
  isOpen: boolean,
  title?: string,
}