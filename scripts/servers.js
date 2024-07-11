const ajaxSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://presently-immense-sculpin.ngrok-free.app/servers",
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
                    ${serverName}
                    <img class="gameCover" alt="${serverName}" title="${serverName}" src="${serverCover}">
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover flexRight" summary="${serverName} Server">
                      <thead>
                        <tr class="flexDown">
                          <th class="borderUnderline" scope="col">Server Name:</th>
                          <th class="borderUnderline" scope="col">IP Address:</th>
                          <th class="borderUnderline" scope="col">Players:</th>
                          <th class="borderUnderline" scope="col">Ping:</th>
                          <th class="borderUnderline" scope="col">Version:</th>
                        </tr>
                      </thead>
                      <tbody class="flexRight">
                        <tr class="flexDown">
                          <td>${serverData.name || serverName||"null"}</td>
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
      });
  }
  
  $(document).ready(function () {
     getServerStatus();
  })
  