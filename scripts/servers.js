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
      <div class="flexDown center gameCoverContainer">
        ${serverName.slice(0, 1).toUpperCase() + serverName.slice(1)}
        <img class="gameCover" alt="${serverName}" title="${serverName}" src="${serverCover}">
      </div>
      <div class=" serverInfoContainer">
        <table class="table table-hover " summary="${serverName} Server">
          <tbody>
            <tr>
              <th class="borderUnderline bg-danger rounded-start" scope="row">Status:</th>
              <td class="bg-danger rounded-end">Offline</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Server Name:</th>
              <td>${serverName.slice(0, 1).toUpperCase() + serverName.slice(1) || "null"}</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">IP Address:</th>
              <td>null</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Players:</th>
              <td>0/0</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Message:</th>
              <td>${response[server].message.slice(0, 1).toUpperCase() + response[server].message.slice(1)}</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Error:</th>
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
      <div class="flexDown center gameCoverContainer">
        ${serverName.slice(0, 1).toUpperCase() + serverName.slice(1)}
        <img class="gameCover" alt="${serverName}" title="${serverName}" src="${serverCover}">
      </div>
      <div class=" serverInfoContainer">
        <table class="table table-hover " summary="${serverName} Server">
          <tbody>
            <tr>
              <th class="borderUnderline bg-success rounded-start" scope="row">Status:</th>
              <td class="bg-success rounded-end">Online</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Server Name:</th>
              <td>${(serverData.name).slice(0, 1).toUpperCase() + serverData.name.slice(1) || serverName.slice(0, 1).toUpperCase() + serverName.slice(1) || "null"}</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">IP Address:</th>
              <td>${serverData.connect || "null"}</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Players:</th>
              <td>${serverData.numplayers}/${serverData.maxplayers || "null"}</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Ping:</th>
              <td>${serverData.ping || "null"}</td>
            </tr>
            <tr>
              <th class="borderUnderline" scope="row">Version:</th>
              <td>${serverData.version || serverData.raw.version.name || "null"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
        console.log(serverData.numplayers);
        $("#serverCards").prepend(example);
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
