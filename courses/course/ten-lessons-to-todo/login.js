const login = (async () => {
  return;
  const logoutRedirectUri = window.location.origin + "/ten-lessons-to-todo/";
  await auth0Service.run({
    auth0Domain: "dev-b4abuxwyzw0h142d.us.auth0.com",
    clientId: "N4cDc7VmfP6SrvQ3vYMethVgENzsURWK",
    params: { audience: "https://api.everybodyelses.com" },
    redirectUri: window.location.origin + window.location.pathname,
    logoutRedirectUri: logoutRedirectUri,
    autoLogin: false
  });

  await auth0Service.handleRedirect();

  const isAuthenticated = await auth0Service.isAuthenticated();
  if (!isAuthenticated) {
    const dialog = `<div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="authModalLabel">Lesson Access</h5>
          <button type="button" class="btn-close" aria-label="Close" onclick="window.location.href = '${logoutRedirectUri}'"></button>
        </div>
        <div class="modal-body text-center">
          <p class="mb-4">To continue to this lesson please login or sign up.</p>
          <div class="d-grid gap-3">
            <button id="modal-login-button" class="btn btn-primary btn-lg" onclick="auth0Service.login();">
              <i class="fas fa-sign-in-alt me-2"></i>Login
            </button>
            <button id="modal-signup-button" class="btn btn-success btn-lg" onclick="auth0Service.signUp();">
              <i class="fas fa-user-plus me-2"></i>Sign Up
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="window.location.href = '${logoutRedirectUri}'">Cancel</button>
        </div>
    </div>
  </div>
</div>
`;

    const div = document.createElement('div');
    div.innerHTML = dialog;
    document.body.appendChild(div);

    const authModal = new bootstrap.Modal(document.getElementById('authModal'), {
      keyboard: false
    });
    authModal.show();
  } else {
    // User is authenticated, show upgrade button
    // showUpgradeButton();
  }

  document.getElementById("sign-up-button").addEventListener("click", (e) => {
    e.preventDefault();
    auth0Service.signUp();
  });

  document.getElementById("login-button").addEventListener("click", (e) => {
    e.preventDefault();
    auth0Service.login();
  });

  document.getElementById("logout-button").addEventListener("click", (e) => {
    e.preventDefault();
    auth0Service.logout();
  });
});
