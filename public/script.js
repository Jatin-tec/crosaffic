// Fetch advertisement URL from the server
fetch('http://yourserver.com/get-advertisement-url')
    .then(response => response.json())
    .then(data => {
        const adUrl = data.advertisementUrl;
        // Create and display the popup with the advertisement
        const adPopup = document.createElement('div');
        adPopup.innerHTML = `<a href="${adUrl}">Check out this site!</a>`;
        document.body.appendChild(adPopup);
    });
