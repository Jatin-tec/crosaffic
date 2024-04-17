document.addEventListener('DOMContentLoaded', (event) => {
    const userMenuButton = document.querySelector('#user-menu-button');
    const userMenu = document.querySelector('[aria-labelledby="user-menu-button"]');

    userMenuButton.addEventListener('click', () => {
      userMenu.classList.toggle('hidden');
    });
  });


  <div
        class="frame"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: black;
          color: white;
          margin-left: 50px;
          margin-right: 50px;
          padding: 0.2rem;
          border-radius: 50px;
          box-shadow: 0 0 1rem black;
          position: sticky;
          bottom: 30px;
          padding-inline-start: 1rem;
          padding-inline-end: 1rem;
          font-size: large;
        "
      >
        <img
          class="logo"
          style="height: auto; width: 150px"
          src="https://gappen.onrender.com/static/img/logo.png"
          alt=""
        />
        <div class="text">
          <p>Here we write something</p>
        </div>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#ffffff" style="--darkreader-inline-fill: #141617;" data-darkreader-inline-fill=""></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#ffffff" style="--darkreader-inline-fill: #141617;" data-darkreader-inline-fill=""></path> </g></svg>
      </div>