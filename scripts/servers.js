const ajaxSettings = {
    async: true,
    crossDomain: true,
    url: 'https://api.retreat896.com/servers',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};
function getServerStatus() {
    $.ajax(ajaxSettings)
        .done(function (response) {
            for (let server in response) {
                if (response[server].error) {
                    let serverData = response[server];
                    let serverName = server; // Use the server key as the name
                    let serverCover = './images/' + serverName.toLowerCase() + '.jpg';
                    if (serverName == 'sevenDays') {
                        serverName = '7 Days to Die';
                    }
                    console.log(serverName);
                    let example = `
  <div class="card mb-3">
    <div class="card-body flexRight">
      <div class="flexDown center gameCoverContainer">
        ${serverName.slice(0, 1).toUpperCase() + serverName.slice(1)}
        <img class="gameCover" alt="${serverName}" title="${serverName}" src="${serverCover}">
      </div>
      <div class=" serverInfoContainer">
        <table class="table table-striped table-hover " summary="${serverName} Server">
          <tbody>
            <tr>
              <th class=" border-0 bg-danger rounded-start" scope="row">Status:</th>
              <td class="bg-danger rounded-end border-0">Offline</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Server Name:</th>
              <td class="rounded-end border-0">${serverName.slice(0, 1).toUpperCase() + serverName.slice(1) || 'null'}</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">IP Address:</th>
              <td class="rounded-end border-0">null</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Players:</th>
              <td class="rounded-end border-0">0/0</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Message:</th>
              <td class="rounded-end border-0">${response[server].message.slice(0, 1).toUpperCase() + response[server].message.slice(1)}</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Error:</th>
              <td class="rounded-end border-0">${response[server].error.slice(0, 1).toUpperCase() + response[server].error.slice(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
                    $('#serverCards').append(example);

                    console.log(response[server].error);
                    console.log(response[server].message);
                } else {
                    let serverData = response[server];
                    let serverName = server; // Use the server key as the name
                    let serverCover = './images/' + serverName.toLowerCase() + '.jpg'; // Assuming cover images are named after the server keys
                    if (serverName == 'sevenDays') {
                        serverName = '7 Days to Die';
                    }
                    let example = `
  <div class="card mb-3">
    <div class="card-body flexRight">
      <div class="flexDown center gameCoverContainer">
        ${serverName.slice(0, 1).toUpperCase() + serverName.slice(1)}
        <img class="gameCover" alt="${serverName}" title="${serverName}" src="${serverCover}">
      </div>
      <div class=" serverInfoContainer">
        <table class="table table-striped table-hover" summary="${serverName} Server">
          <tbody>
            <tr>
              <th class="bg-success rounded-start" scope="row">Status:</th>
              <td class="bg-success rounded-end border-0">Online</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Server Name:</th>
              <td class="rounded-end border-0">${serverData.name.slice(0, 1).toUpperCase() + serverData.name.slice(1) || serverName.slice(0, 1).toUpperCase() + serverName.slice(1) || 'null'}</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">IP Address:</th>
              <td class="rounded-end border-0">${serverData.connect || 'null'}</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Players:</th>
              <td class="rounded-end border-0">${serverData.numplayers}/${serverData.maxplayers || 'null'}</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Ping:</th>
              <td class="rounded-end border-0">${serverData.ping || 'null'}</td>
            </tr>
            <tr>
              <th class="rounded-start border-0" scope="row">Version:</th>
              <td class="rounded-end border-0">${serverData.version || serverData.raw.version.name || 'null'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
                    console.log(serverData.numplayers);
                    $('#serverCards').prepend(example);
                }
            }
            $('.placeholder-wave').removeClass('placeholder-wave');
            $('.placeholder-glow').removeClass('placeholder-glow');
            $('.placeholder').removeClass('placeholder');
            $('#loadingCard').remove();
        })
        .fail(function () {
            $('#serverCards')
                .find(".placeholder:not('.gameCoverContainer'), .placehodler-sm:not('.gameCoverContainer')")
                .each(function () {
                    console.log($(this).text());
                    $(this).text('Error').addClass('bg-danger rounded-end').removeClass('placeholder placeholder-sm');
                });
            $('#serverCards').find('.gameCoverContainer').removeClass('placeholder placeholder-sm').html("<img class='rounded mx-auto d-block' alt='...' title='...' src='./images/filler.png' width='100%'>");
        });
}

$(document).ready(function () {
    getServerStatus();
});
