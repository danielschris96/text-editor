const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Save the 'beforeinstallprompt' event, then show the install button.
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt event fired');
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

// When the install button is clicked, trigger the 'beforeinstallprompt' event.
butInstall.addEventListener('click', async () => {
  console.log('Install button clicked');
  // hide our user interface that shows our A2HS button
  butInstall.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  // We no longer need the saved prompt so we'll delete it
  deferredPrompt = null;
});

// When the app is installed, log a message to the console.
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed');
});
