const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// This event handler will be triggered when the browser considers the app installable
window.addEventListener('beforeinstallprompt', (event) => {

  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button.
  butInstall.classList.toggle('hidden', false);
});

// This event handler will be triggered when the user clicks on the install button
butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  // Show the install prompt.
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
});

// This event handler will be triggered when the app is installed
window.addEventListener('appinstalled', (event) => {
  // Clear prompt
  window.deferredPrompt = null;
}); 
