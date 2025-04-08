document.addEventListener('DOMContentLoaded', function() {
    // Add Server button functionality
    const addServerBtn = document.getElementById('addServerBtn');
    if (addServerBtn) {
        addServerBtn.addEventListener('click', function() {
            // This would typically open a modal or redirect to an add server page
            alert('Add server functionality will be implemented here');
        });
    }

    // Server action buttons
    const serverActions = document.querySelectorAll('.server-actions button');
    serverActions.forEach(button => {
        button.addEventListener('click', function() {
            const serverId = this.getAttribute('data-id');
            const action = this.classList.contains('start-btn') ? 'start' :
                          this.classList.contains('stop-btn') ? 'stop' :
                          this.classList.contains('edit-btn') ? 'edit' : 'delete';
            
            // This would typically make an API call to perform the action
            console.log(`Performing ${action} on server ${serverId}`);
            
            if (action === 'delete') {
                if (confirm('Are you sure you want to delete this server?')) {
                    // Delete server API call would go here
                    alert(`Server ${serverId} would be deleted`);
                }
            } else if (action === 'edit') {
                // Edit server functionality
                alert(`Edit server ${serverId}`);
            } else {
                // Start/Stop server
                alert(`${action.charAt(0).toUpperCase() + action.slice(1)} server ${serverId}`);
            }
        });
    });
});