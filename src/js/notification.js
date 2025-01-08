export function displayNotification(messageContent){
  // Funcion que despliega una notificacion por pantalla.
  const container = document.getElementById('notificationContainer');
  container.innerHTML = '';
  container.innerHTML = messageContent;
  container.style.opacity = '1';

  setTimeout(() => {
    container.style.opacity = '0';
  }, 2000);
}