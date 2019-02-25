import Vue from 'vue'

export default class Snackbar {
  constructor (router) {
    this.router = router
    this._vm = new Vue({
      data: function () {
        return {
          snack: null
        }
      }
    })
  }

  get snack () {
    return this._vm.$data.snack
  }

  setSnack (value) {
    this._vm.$data.snack = value
  }

  clear () {
    this.setSnack(null)
  }

  /**
   * Displays a success message in snackbar and optionally routes to path.
   * @param {*} message message to be displayed.
   * @param {*} path a string literal or option parameters for $router.push
   */
  success (message, path) {
    this._handleSnack(message, false, path)
  }

  /**
   * Displays an error message in snackbar and outputs console error.
   * @param {string | Error} error message to be displayed from error.message or string literal.
   * @param {boolean} isPublic only applies if error is an object.
 */
  error (error, isPublic = false) {
    if (error) { console.error(error) }

    let message = 'An unknown error has occured.'
    if (typeof error === 'string') {
      message = error
    } else if (error.message && isPublic) {
      message = error.message
    }

    this._handleSnack(message, true)
  }

  _handleSnack (message, isError, path) {
    const snack = {
      message,
      isError,
      path: this._currentPath()
    }

    if (path) {
      this.router.push(path, () => {
        snack.path = this._currentPath()
        this.setSnack(snack)
      })
    } else {
      this.setSnack(snack)
    }
  }

  _currentPath () {
    return this.router.history.current.path
  }
}
