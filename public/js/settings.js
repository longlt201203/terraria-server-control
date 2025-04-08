document.addEventListener('DOMContentLoaded', function() {
    // Show/Hide API Key
    const apiKeyInput = document.getElementById('apiKey');
    const showApiKeyBtn = document.getElementById('showApiKey');
    
    if (showApiKeyBtn) {
        showApiKeyBtn.addEventListener('click', function() {
            if (apiKeyInput.type === 'password') {
                apiKeyInput.type = 'text';
                showApiKeyBtn.textContent = 'Hide';
            } else {
                apiKeyInput.type = 'password';
                showApiKeyBtn.textContent = 'Show';
            }
        });
    }
    
    // Regenerate API Key
    const regenerateApiKeyBtn = document.getElementById('regenerateApiKey');
    if (regenerateApiKeyBtn) {
        regenerateApiKeyBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to regenerate the API key? You will need to update any applications using the current key.')) {
                // This would typically make an API call to regenerate the key
                alert('API key regeneration would happen here');
            }
        });
    }
    
    // Settings form submission
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const settings = {
                terrariaPath: formData.get('terrariaPath'),
                autoStart: formData.get('autoStart') === 'on'
            };
            
            // This would typically make an API call to save settings
            console.log('Saving settings:', settings);
            alert('Settings saved successfully!');
        });
    }
    
    // Reset settings
    const resetSettingsBtn = document.getElementById('resetSettings');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all settings to default values?')) {
                // This would typically make an API call to reset settings
                alert('Settings reset would happen here');
                // Reload the page to show default settings
                window.location.reload();
            }
        });
    }
});