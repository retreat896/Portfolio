const ajaxSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.retreat896.com/servers",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  };
  function getServerStatus() {
    $.ajax(ajaxSettings).done(function (response) {
        for (let server in response) {
          if (response[server].error) {
            let serverData = response[server];
            let serverName = server; // Use the server key as the name
            let serverCover = './images/' + serverName.toLowerCase() + '.jpg';
            let example = `
              <div class="card mb-3">
                <div class="card-body flexRight">
                  <div class="flexDown center">
                    ${serverName.slice(0, 1).toUpperCase() + serverName.slice(1)}
                    <img class="gameCover" alt="${serverName}" title="${serverName}" src="${serverCover}">
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover flexRight" summary="${serverName} Server">
                      <thead>
                        <tr class="flexDown">
                          <th class="borderUnderline bg-danger" scope="col">Status:</th>
                          <th class="borderUnderline" scope="col">Server Name:</th>
                          <th class="borderUnderline" scope="col">IP Address:</th>
                          <th class="borderUnderline" scope="col">Players:</th>
                          <th class="borderUnderline" scope="col">Message:</th>
                          <th class="borderUnderline" scope="col">Error:</th>
                        </tr>
                      </thead>
                      <tbody class="flexRight">
                        <tr class="flexDown">
                          <td class="bg-danger">Offline</td>
                          <td>${serverName.slice(0, 1).toUpperCase() + serverName.slice(1)||"null"}</td>
                          <td>null</td>
                          <td>0/0</td>
                          <td>${response[server].message.slice(0, 1).toUpperCase() + response[server].message.slice(1)}</td>
                          <td>${response[server].error.slice(0, 1).toUpperCase() + response[server].error.slice(1)}</td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>`
              $("#serverCards").append(example);
          
            console.log(response[server].error);
            console.log(response[server].message);
          } else {
            let serverData = response[server];
            let serverName = server; // Use the server key as the name
            let serverCover = './images/' + serverName.toLowerCase() + '.jpg'; // Assuming cover images are named after the server keys
  
            let example = `
              <div class="card mb-3">
                <div class="card-body flexRight">
                  <div class="flexDown center">
                    ${serverName.slice(0, 1).toUpperCase() + serverName.slice(1)}
                    <img class="gameCover" alt="${serverName}" title="${serverName}" src="${serverCover}">
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover flexRight" summary="${serverName} Server">
                      <thead>
                        <tr class="flexDown">
                        <th class="borderUnderline bg-success" scope="col">Status:</th>
                          <th class="borderUnderline" scope="col">Server Name:</th>
                          <th class="borderUnderline" scope="col">IP Address:</th>
                          <th class="borderUnderline" scope="col">Players:</th>
                          <th class="borderUnderline" scope="col">Ping:</th>
                          <th class="borderUnderline" scope="col">Version:</th>
                        </tr>
                      </thead>
                      <tbody class="flexRight">
                        <tr class="flexDown">
                          <td class="bg-success rounded">Online</td>
                          <td>${(serverData.name).slice(0, 1).toUpperCase() + serverData.name.slice(1) || serverName.slice(0, 1).toUpperCase() + serverName.slice(1)||"null"}</td>
                          <td>${serverData.connect||"null"}</td>
                          <td>${serverData.numplayers||"null"}/${serverData.maxplayers||"null"}</td>
                          <td>${serverData.ping||"null"}</td>
                          <td>${serverData.version||"null"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>`;
            
            $("#serverCards").append(example);
          }
        }
        $('.placeholder-wave').removeClass('placeholder-wave');
         $('.placeholder-glow').removeClass('placeholder-glow');
         $('.placeholder').removeClass('placeholder');
         $("#loadingCard").remove();
      });
  }
  
  $(document).ready(function () {
     getServerStatus()
  })
  