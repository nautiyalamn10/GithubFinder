$(document).ready(function () {
  $("#searchUser").on("keyup", function (e) {
    // console.log("typing");
    let username = e.target.value;

    //make request using ajax
    $.ajax({
      url: "https://api.github.com/users/" + username,
      data: {
        client_id: "c16fdfee0bc24fb3109a",
        client_secret: "ac2a167b082ca2fa32fdcef5ba6a9ffbb26cd142",
      },
    }).done(function (user) {
      // console.log(user);
      $.ajax({
        url: "https://api.github.com/users/" + username + "/repos",
        data: {
          client_id: "c16fdfee0bc24fb3109a",
          client_secret: "ac2a167b082ca2fa32fdcef5ba6a9ffbb26cd142",
          sort: "created asc",
          per_page: 5,
        },
      }).done(function (repos) {
        //lets use for each
        $.each(repos, function (index, repo) {
          $("#repos").append(
            `
            <div class="well">
                <div class="row">
                    <div class="col-md-7">
                    <strong>${repo.name}</strong>
                    :${repo.description}
                    </div>
                    <div class="col-md-3">
                        <p class="text-uppercase">Forks : ${repo.forks_count}</p>
                        <p class="text-uppercase">Watchers : ${repo.watchers_count}</p>
                    </div>
                    <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-success">Repo page</a>
                    </div>
                </div>
            </div>
                `
          );
        });
      });
      $("#profile").html(`
      <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-3">
                    <img style="width:100%" class="thumbnail" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block my-2" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company : ${user.company} </li>
                        <li class="list-group-item">Followers : ${user.followers} </li>
                        <li class="list-group-item">Following : ${user.following} </li>
                        <li class="list-group-item">Bio : ${user.bio} </li>
                    </ul>
                </div>
            </div>
        </div>
       </div>
       <h3 class="page-header">Latest Repos </h3>
       <div id="repos"></div>
      `);
    });
  });
});
/*
<span class="label label-default">Public Repos : ${user.public_repos}</span>
                    <span class="label label-primary">Blog : ${user.blog}</span>
                    <span class="label label-success">Location : ${user.location}</span>
                    <span class="label label-info">Twitter Name : ${user.twitter_username}</span>
                    
                    */
