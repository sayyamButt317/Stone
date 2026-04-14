'use client'
import { ModalRoot } from "./modal-root"
import { ModalHeader } from "./modal-header"
import { ModalBody } from "./modal-body"
import { ModalFooter } from "./modal-footer"
import { ModalTrigger } from "./modal-trigger"
import Stepper from "../stepper"

type ModalType = typeof ModalRoot & {
    Header: typeof ModalHeader
    Body: typeof ModalBody
    Footer: typeof ModalFooter
    Trigger: typeof ModalTrigger
    Stepper: typeof Stepper
}

export const Modal = ModalRoot as ModalType

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.Trigger = ModalTrigger
Modal.Stepper = Stepper