/**
 * The main script file of the application.
 *
 * @author Emil Meri <em223ve@student.lnu.se>
 * @version 1.0.0
 */

const inputForm = document.querySelector('#form-container')
const greeting = document.querySelector('#greeting-container')

inputForm.addEventListener('submit', (event) => {
  event.preventDefault()
  showGreeting()
})

function showGreeting() {
  const name = document.querySelector('#name').value

  greeting.textContent = `Hello ${name}!`

  inputForm.classList.toggle('hidden')
  greeting.classList.toggle('hidden')
}
