import { swalClasses } from '../../classes.js'
import * as dom from '../../dom/index.js'
import { capitalizeFirstLetter } from '../../utils.js'
import { isLoading } from '../getters.js'

export const renderActions = (instance, params) => {
  const actions = dom.getActions()
  const confirmButton = dom.getConfirmButton()
  const denyButton = dom.getDenyButton()
  const cancelButton = dom.getCancelButton()

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    dom.hide(actions)
  }

  // Custom class
  dom.applyCustomClass(actions, params, 'actions')

  // Render Confirm button
  renderButton(confirmButton, 'confirm', params)
  // Render Deny button
  renderButton(denyButton, 'deny', params)
  // render Cancel Button
  renderButton(cancelButton, 'cancel', params)

  if (params.buttonsStyling) {
    handleButtonsStyling(confirmButton, denyButton, cancelButton, params)
  } else {
    dom.removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled)
    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = ''
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = ''
  }

  if (params.reverseButtons) {
    confirmButton.parentNode.insertBefore(cancelButton, confirmButton)
    confirmButton.parentNode.insertBefore(denyButton, confirmButton)
  }
}

function handleButtonsStyling (confirmButton, denyButton, cancelButton, params) {
  dom.addClass([confirmButton, denyButton, cancelButton], swalClasses.styled)

  // Buttons background colors
  if (params.confirmButtonColor) {
    confirmButton.style.backgroundColor = params.confirmButtonColor
  }
  if (params.denyButtonColor) {
    denyButton.style.backgroundColor = params.denyButtonColor
  }
  if (params.cancelButtonColor) {
    cancelButton.style.backgroundColor = params.cancelButtonColor
  }

  // Loading state
  if (!isLoading()) {
    const confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color')
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor
  }
}

function renderButton (button, buttonType, params) {
  dom.toggle(button, params[`show${capitalizeFirstLetter(buttonType)}Button`], 'inline-block')
  dom.setInnerHtml(button, params[`${buttonType}ButtonText`]) // Set caption text
  button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`]) // ARIA label

  // Add buttons custom classes
  button.className = swalClasses[buttonType]
  dom.applyCustomClass(button, params, `${buttonType}Button`)
  dom.addClass(button, params[`${buttonType}ButtonClass`])
}
