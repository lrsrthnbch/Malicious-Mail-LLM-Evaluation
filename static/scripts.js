function fetchResults() {
    fetch('/get-results')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';
            data.forEach(email => {
                const emailDiv = document.createElement('div');
                emailDiv.className = 'email-box';
                let ratingClass = '';
                if (email.rating !== null && email.rating !== undefined) {
                    ratingClass = email.rating >= 5 ? 'high-risk' : 'low-risk';
                }
                emailDiv.innerHTML = `
                    <h2 class="email-subject">${email.subject}</h2>
                    <div class="email-header">
                        <span><b>Sender:</b> ${email.sender}</span> |
                        <span><b>Email:</b> ${email.sender_address}</span> |
                        <span><b>Timestamp:</b> ${email.timestamp}</span>
                    </div>
                    <div class="email-body">
                        <div class="original-content">
                            <h3>Original Content</h3>
                            <p style="font-style: italic;">${email.content}</p>
                        </div>
                        <div class="evaluation">
                            <h3>Evaluation</h3>
                            <p class="${ratingClass}">${email.evaluation}</p>
                        </div>
                    </div>
                `;
                if (resultsContainer.firstChild) {
                    resultsContainer.insertBefore(emailDiv, resultsContainer.firstChild);
                } else {
                    resultsContainer.appendChild(emailDiv);
                }
            });
        });
    }

    
    function fetchLog() {
    fetch('/get-log')
        .then(response => response.text())
        .then(text => {
            const logContainer = document.getElementById('log');
            logContainer.textContent = text;
            logContainer.scrollTop = logContainer.scrollHeight;
        });
    }

    document.getElementById('resetBtn').addEventListener('click', function() {
        fetch('/reset-database', {
            method: 'POST',
        })
        .then(() => {
            location.reload();
        })
        .catch(error => console.error('Error resetting database:', error));
    });

    setInterval(fetchResults, 1000);
    setInterval(fetchLog, 100);