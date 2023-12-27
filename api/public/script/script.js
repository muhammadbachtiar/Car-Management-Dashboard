window.addEventListener('DOMContentLoaded', event => {
  const sidebarToggle = document.body.querySelector('#sidebarToggle')
  if (sidebarToggle != null) {
    sidebarToggle.addEventListener('click', event => {
      event.preventDefault()
      document.body.classList.toggle('sb-sidenav-toggled')
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'))
    })
  }
})
